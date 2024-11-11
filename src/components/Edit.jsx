import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    availabilityStatus: true,
  });

  useEffect(() => {
    // Fetch product details on component mount
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${id}`
        );
        setFormValues({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          availabilityStatus: response.data.availabilityStatus,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Update form values on input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  // Handle product update
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
          },
        }
      );
      alert("Product updated successfully");
      navigate("/products"); // Redirect to products page
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>

      <TextField
        label="Product Name"
        name="name"
        value={formValues.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        name="description"
        value={formValues.description}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        min="0"
        value={formValues.price}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth sx={{ marginTop: "16px", marginBottom: "16px" }}>
        <InputLabel id="availability-status-label">
          Availability Status
        </InputLabel>
        <Select
          labelId="availability-status-label"
          name="availabilityStatus"
          value={formValues.availabilityStatus}
          onChange={handleInputChange}
          label="Availability Status"
        >
          <MenuItem value={true}>In Stock</MenuItem>
          <MenuItem value={false}>Out of Stock</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: "20px" }}
      >
        Update Product
      </Button>
    </Box>
  );
}
