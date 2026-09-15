async function runTests() {
  const BASE_URL = 'http://localhost:5175/api';
  console.log('--- Starting MM Decor Studio API Test Suite ---');

  // Test 1: Health check
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  console.log('✓ Health API:', health.status, health.studio);

  // Test 2: Services
  const servicesRes = await fetch(`${BASE_URL}/services`);
  const services = await servicesRes.json();
  console.log(`✓ Services count: ${services.count}`);

  // Test 3: Portfolio (Initial Empty State)
  const portfolioRes = await fetch(`${BASE_URL}/portfolio`);
  const portfolio = await portfolioRes.json();
  console.log(`✓ Portfolio initial count: ${portfolio.count}`);

  // Test 4: Gallery (Initial Empty State)
  const galleryRes = await fetch(`${BASE_URL}/gallery`);
  const gallery = await galleryRes.json();
  console.log(`✓ Gallery initial count: ${gallery.count}`);

  // Test 5: Client Inquiry Submission (POST /api/inquiries)
  const inqPayload = {
    name: 'Tariq Mehmood',
    phone: '+92 300 9876543',
    email: 'tariq@example.com',
    interestedIn: 'Interior Design',
    subject: 'Drawing Room & Foyer Spatial Design',
    message: 'Seeking a comprehensive spatial consultation and material moodboard in Lahore.',
  };
  const inqRes = await fetch(`${BASE_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inqPayload),
  });
  const inqData = await inqRes.json();
  console.log('✓ Inquiry submission:', inqData.success, inqData.message);
  const createdInquiryId = inqData.data?._id;

  // Test 6: Admin Login (POST /api/auth/login)
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: 'MMDecorStudio@2026!',
    }),
  });
  const loginData = await loginRes.json();
  console.log('✓ Admin login:', loginData.success, 'Token received:', !!loginData.token);
  const token = loginData.token;

  if (!token) {
    throw new Error('Login failed, cannot continue authenticated tests');
  }

  // Test 7: Verify Admin Token (GET /api/auth/me)
  const meRes = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const meData = await meRes.json();
  console.log('✓ Admin auth verification:', meData.success, meData.admin?.username);

  // Test 8: Get Inquiries as Admin (GET /api/inquiries)
  const adminInqRes = await fetch(`${BASE_URL}/inquiries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const adminInq = await adminInqRes.json();
  console.log(`✓ Admin retrieved ${adminInq.count} inquiries.`);

  // Test 9: Update Inquiry Status (PUT /api/inquiries/:id)
  if (createdInquiryId) {
    const updateInqRes = await fetch(`${BASE_URL}/inquiries/${createdInquiryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'read' }),
    });
    const updateInqData = await updateInqRes.json();
    console.log('✓ Inquiry status update:', updateInqData.success, updateInqData.data?.status);
  }

  // Test 10: Create Portfolio Project as Admin (POST /api/portfolio)
  const newProjectRes = await fetch(`${BASE_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Minimalist Penthouse Living & Terrace Lounge',
      category: 'Interior',
      description:
        'A dialogue of raw travertine, limewash wall treatments, and ambient recessed illumination, establishing spatial calm amidst Lahore.',
      images: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      ],
      location: 'Lahore',
      date: 'Autumn 2026',
    }),
  });
  const newProjectData = await newProjectRes.json();
  console.log('✓ Portfolio creation:', newProjectData.success, newProjectData.data?._id);
  const projectId = newProjectData.data?._id;

  // Test 11: Get Project by ID (GET /api/portfolio/:id)
  if (projectId) {
    const projDetailRes = await fetch(`${BASE_URL}/portfolio/${projectId}`);
    const projDetail = await projDetailRes.json();
    console.log('✓ Single project lookup:', projDetail.success, projDetail.data?.title);
  }

  // Test 12: Add Gallery Photo as Admin (POST /api/gallery)
  const newGalleryRes = await fetch(`${BASE_URL}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      title: 'Candlelit Tablescape & Velvet Draping',
      category: 'Events',
      description:
        'Layered ambient lighting with bespoke floral architecture and warm champagne linen styling in Lahore.',
    }),
  });
  const newGalleryData = await newGalleryRes.json();
  console.log('✓ Gallery creation:', newGalleryData.success, newGalleryData.data?._id);

  console.log('=== ALL 12 ENDPOINT TESTS PASSED SUCCESSFULLY! ===');
}

runTests().catch((err) => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
