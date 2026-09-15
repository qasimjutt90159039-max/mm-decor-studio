import bcrypt from 'bcryptjs';

// Global In-Memory Store
const memoryStore = {
  portfolios: [],
  galleries: [],
  services: [],
  inquiries: [],
  admins: [],
};

const generateId = () => Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

export class InMemoryCollection {
  constructor(collectionName) {
    this.name = collectionName;
    if (!memoryStore[collectionName]) {
      memoryStore[collectionName] = [];
    }
  }

  get items() {
    return memoryStore[this.name];
  }

  set items(val) {
    memoryStore[this.name] = val;
  }

  async countDocuments(filter = {}) {
    const list = await this.find(filter);
    return list.length;
  }

  async find(filter = {}) {
    let result = this.items.filter((item) => {
      for (const key of Object.keys(filter)) {
        if (key === '$or' && Array.isArray(filter.$or)) {
          const matched = filter.$or.some((condition) => {
            for (const orKey of Object.keys(condition)) {
              const rule = condition[orKey];
              const val = item[orKey] || '';
              if (rule instanceof RegExp) {
                if (!rule.test(val)) return false;
              } else if (rule !== val) {
                return false;
              }
            }
            return true;
          });
          if (!matched) return false;
          continue;
        }

        const expected = filter[key];
        const val = item[key];
        if (expected instanceof RegExp) {
          if (!expected.test(val || '')) return false;
        } else if (expected !== undefined && expected !== val) {
          return false;
        }
      }
      return true;
    });

    // Return query-like object supporting .sort() and .populate()
    const queryObj = {
      _data: result.map((doc) => this._wrap(doc)),
      sort(sortObj = { createdAt: -1 }) {
        const key = Object.keys(sortObj)[0];
        const dir = sortObj[key];
        this._data.sort((a, b) => {
          if (a[key] < b[key]) return dir === 1 ? -1 : 1;
          if (a[key] > b[key]) return dir === 1 ? 1 : -1;
          return 0;
        });
        return this;
      },
      populate(field, select) {
        // Simple populate for portfolioId
        if (field === 'portfolioId') {
          for (const item of this._data) {
            if (item.portfolioId) {
              const found = memoryStore.portfolios.find(
                (p) => String(p._id) === String(item.portfolioId)
              );
              if (found) {
                item.portfolioId = {
                  _id: found._id,
                  title: found.title,
                  category: found.category,
                };
              }
            }
          }
        }
        return this;
      },
      then(resolve, reject) {
        return Promise.resolve(this._data).then(resolve, reject);
      },
    };

    return queryObj;
  }

  async findOne(filter = {}) {
    const list = await this.find(filter);
    return list._data && list._data.length > 0 ? list._data[0] : null;
  }

  async findById(id) {
    const doc = this.items.find((item) => String(item._id) === String(id));
    return doc ? this._wrap(doc) : null;
  }

  async create(data) {
    if (Array.isArray(data)) {
      const created = [];
      for (const item of data) {
        created.push(await this.create(item));
      }
      return created;
    }

    const doc = {
      ...data,
      _id: data._id || generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // If admin model and password not hashed yet
    if (this.name === 'admins' && doc.password && !doc.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(doc.password, salt);
    }

    this.items.unshift(doc);
    return this._wrap(doc);
  }

  async findByIdAndDelete(id) {
    const idx = this.items.findIndex((item) => String(item._id) === String(id));
    if (idx !== -1) {
      const removed = this.items.splice(idx, 1)[0];
      return this._wrap(removed);
    }
    return null;
  }

  _wrap(doc) {
    const coll = this;
    return {
      ...doc,
      async matchPassword(entered) {
        return await bcrypt.compare(entered, doc.password);
      },
      async save() {
        this.updatedAt = new Date().toISOString();
        const idx = coll.items.findIndex((item) => String(item._id) === String(this._id));
        if (idx !== -1) {
          coll.items[idx] = { ...this };
        }
        return this;
      },
    };
  }
}
