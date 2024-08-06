import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function AboutUs() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(../../../public/images/about-us-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 4,
        mt: '3rem',
        color: 'white',
      }}
    >
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h2" sx={{ mb: 4 }}>
            About Us
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            At Furniture Fusion, our mission is simple: to connect people with the perfect furniture for their homes while providing an easy and enjoyable selling experience. Whether you’re looking to furnish your space with unique, high-quality pieces or to find a new home for your gently-used furniture, we are here to help.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            What We Do
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            We believe that furniture should be both functional and stylish. That’s why we’ve created a platform where users can browse a diverse range of furniture options, from elegant sofas and chic tables to modern chairs and antique treasures. Our platform allows:
          </Typography>
          <Box sx={{ mb: 4 }}>
            <ul>
              <li><strong>Buyers</strong>: Explore an extensive collection of furniture items, compare options, and find the perfect pieces to enhance your living space. With detailed descriptions, high-resolution images, and user reviews, shopping for furniture has never been easier.</li>
              <li><strong>Sellers</strong>: List your furniture effortlessly and reach a wide audience of potential buyers. Whether you’re a professional seller or simply looking to declutter your home, our user-friendly interface ensures a smooth and hassle-free selling experience.</li>
            </ul>
          </Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Our Values
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            We prioritize quality, ensuring that every item on our platform meets high standards. Our team carefully reviews listings to maintain a curated selection of excellent furniture.
          </Typography>
          <Box sx={{ mb: 4 }}>
            <ul>
              <li><strong>Quality</strong>: We prioritize quality, ensuring that every item on our platform meets high standards. Our team carefully reviews listings to maintain a curated selection of excellent furniture.</li>
              <li><strong>Integrity</strong>: We value honesty and transparency. Our goal is to foster a community of trust, where buyers and sellers can interact with confidence and security.</li>
              <li><strong>Customer Satisfaction</strong>: Your satisfaction is our top priority. We are committed to providing exceptional customer service and support throughout your buying or selling journey.</li>
            </ul>
          </Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Join Our Community
          </Typography>
          <Typography variant="body1">
            We invite you to become part of our growing community of furniture enthusiasts. Discover new pieces, share your finds, and connect with others who share your passion for beautiful and functional furniture. 
            At Furniture Fusion, we’re more than just a marketplace—we’re a community dedicated to making furniture shopping and selling a seamless and enjoyable experience.
            Thank you for visiting our website. We look forward to helping you find or sell the perfect furniture!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutUs;
