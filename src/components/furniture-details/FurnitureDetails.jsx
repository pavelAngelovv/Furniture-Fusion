import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
import { getFurnitureItemById } from '../../services/furnitureService';

const FurnitureDetails = () => {
    const { id } = useParams();
    const [furniture, setFurniture] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getFurnitureItemById(id);
                setFurniture(data);
            } catch (error) {
                console.error('Error fetching furniture item', error);
            }
        })();
    }, [id]);

    if (!furniture) return <CircularProgress />;

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    alt={furniture.title}
                    height="400"
                    image={furniture.image}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {furniture.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {furniture.description}
                    </Typography>
                    <Typography variant="h6" component="div">
                        ${furniture.price}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default FurnitureDetails;
