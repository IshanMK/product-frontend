import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import ImageIcon from "./ImageIcon";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: 800,
        margin: "20px",
        padding: "20px",
        opacity: product.availabilityStatus ? 1 : 0.5, // Lower opacity when out of stock
        backgroundColor: product.availabilityStatus ? "white" : "#D3D3D3", // Light gray background when out of stock
        pointerEvents: product.availabilityStatus ? "auto" : "none", // Disable clicks on out-of-stock products
        transition: "opacity 0.3s ease", // Smooth transition for opacity changes
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <ImageIcon sx={{ fontSize: 80, color: "gray" }} />
      </Box>

      {/* Middle Part - Product Details */}
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "600" }}>
          {product.name}
        </Typography>
        <Typography color="text.secondary" sx={{ marginTop: "10px" }}>
          {product.description}
        </Typography>

        <Box
          sx={{
            gap: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginLeft: "70px", // Margin to keep buttons separate from content
            padding: "15px", // Padding around buttons
            height: "auto",
          }}
        >
          <Chip
            label={`$${product.price}`}
            color="primary"
            sx={{
              marginTop: "10px",
              fontSize: "1.2rem", // Larger font size
              padding: "8px 16px", // Larger padding
              marginLeft: "10px", // Add a gap between price and availability label
            }}
          />
          {/* Availability as a label */}
          <Chip
            label={product.availabilityStatus ? "In Stock" : "Out of Stock"}
            color={product.availabilityStatus ? "success" : "error"}
            sx={{
              marginTop: "10px",
              fontSize: "1.2rem",
              padding: "8px 16px", // Larger padding
            }}
          />
        </Box>
      </CardContent>

      {/* Rightmost Section for Edit and Delete Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Align buttons to the top
          alignItems: "center",
          gap: "10px", // Reduced gap between buttons
          marginLeft: "20px", // Margin to keep buttons separate from content
          marginTop: "60px", // Margin to keep buttons separate from top
          padding: "5px", // Padding around buttons
          height: "auto", // Remove fixed height to allow flexibility
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          sx={{
            padding: "8px 16px",
            fontSize: "0.8rem",
            width: "160px", // Set a fixed width for consistency
          }}
        >
          Edit Product
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          sx={{
            padding: "8px 16px",
            fontSize: "0.8rem",
            width: "160px", // Set a fixed width for consistency
          }}
        >
          Delete Product
        </Button>
      </Box>
    </Card>
  );
}
