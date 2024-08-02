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
              mt: '3rem'
            }}
          >
            <img
              src='../../../public/images/Furniture-Fusion-logo.png'
              alt="Logo"
              style={{ height: '390px', width: 'auto' }}
            />
          </Box>
    );
};

export default Home;