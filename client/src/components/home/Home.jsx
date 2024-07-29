import { Box } from "@mui/material";

const Home = () => {
    return (
        <Box
            sx={{
              ml: 'auto',
              mr: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src='../../../public/images/Furniture-Fusion-logo.png'
              alt="Logo"
              style={{ height: '800px', width: 'auto' }}
            />
          </Box>
    );
};

export default Home;