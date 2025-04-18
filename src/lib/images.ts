// Function to get the full URL for an image from lovable-uploads
export const getLovableImageUrl = (filename: string) => {
  return `/lovable-uploads/${filename}`;
};

// Map of image IDs to their descriptions
export const imageDescriptions: Record<string, string> = {
  // Add descriptions for each image as needed
};

// Helper function to check if an image exists in the lovable-uploads directory
export const isValidLovableImage = (filename: string): boolean => {
  const validImages = [
    'logo.png',
    '083b5b86-80ea-40ac-9955-85810217b791.png',
    '0ac32609-97f1-4ced-9e8a-bc414e2ab99f.png',
    '0c8f07cd-5c74-4fc7-99ca-69ad91a81cbf.png',
    '10009dde-cb1f-43c4-ba83-291a7884ec45.png',
    '1d52ea85-1e3d-47f6-a5fe-d681843e8ae5.png',
    '1ff29f9b-ba5f-490b-b1e7-dbae5618e0bf.png',
    '21626481-6d06-4bfa-be0b-f3569fec8f6f.png',
    '2de1814b-9760-416f-89a6-5dbf931a1644.png',
    '338e9c37-1176-4b4a-9651-0e4b171202ec.png',
    '3f0b79f8-c627-4756-bc9d-97709e1b3dcf.png',
    '48a9e215-82f0-4c8e-8e37-618a48a13d28.png',
    '4e2814c3-86e0-437f-a978-ba642084cc16.png',
    '513c5cbc-db70-46a2-87a7-d1abc1eb24b3.png',
    '5f666153-298f-4278-be57-c41d9c9f3d37.png',
    '60e32970-ee6d-44ae-b0b7-bb88709fbda4.png',
    '62a71ada-cf94-440a-9848-d209cb1d6aa9.png',
    '73e1be92-ccc5-4af6-afb8-b660232e66c3.png',
    '7d96ed56-9bd9-4a43-940c-eba1fce3f2c2.png',
    '83d5072e-987b-4917-b5be-c4050a12bcce.png',
    '88930c66-16e5-42df-bfc7-81aca9d18beb.png',
    '8c7e2312-fd5f-40fb-96c1-b8c1fb840e69.png',
    '9a11a1a4-cd06-4f1e-8adc-ec03c45dd5b3.png',
    '9f15aa58-15fb-48e3-9764-83c5bdad6a62.png',
    'a28e4368-1dd6-4a7d-a479-aae6c69831f2.png',
    'a88617bc-2289-458f-a79b-2ac938ac20ed.png',
    'aae422e0-9cc4-4744-8fb9-8d3d39450edc.png',
    'ad081508-bd39-4a78-9a84-84eb52afd4ce.png',
    'af8832ce-c05a-4c24-abed-86de6717b240.png',
    'b1b13749-fec1-49fa-b2fb-087fa59772ed.png',
    'b26fde0f-6a5e-4fdd-99f1-cc68d4160d3f.png',
    'b5620eaa-79c9-4131-b738-f6745339824a.png',
    'bb0eff48-37e2-4e1f-9cda-27fa7cce7070.png',
    'c0bb2e2b-173e-4dd0-8a23-c9136cc380ac.png',
    'c127dd28-b380-4fda-b5c0-d25a8e533335.png',
    'ce1d696e-de8b-416d-bcc1-c0b253d7c35d.png',
    'd02ef70d-082a-4680-a317-90a12a47537f.png',
    'd1b573ca-4749-4c86-a0cd-ccacdbbffdb9.png',
    'd5f5efbc-bade-41fd-aafc-970e2c74b529.png',
    'de6c33eb-c059-4823-bf59-4fc4b429627b.png',
    'dfc4e091-de83-49fa-8933-9edc0a446ec2.png',
    'e912d05d-6bb4-4d7f-bf00-5cd60f586ff4.png',
    'f9c48cfd-f253-4bfd-a72c-2cdbc5853beb.png'
  ];
  return validImages.includes(filename);
}; 