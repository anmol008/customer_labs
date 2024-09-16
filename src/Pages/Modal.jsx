import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';

const schemas = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const SegmentModal = ({ open, handleClose, handleSave }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemasList, setSchemasList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddSchema = () => {
    if (
      selectedSchema &&
      !schemasList.some((schema) => schema.value === selectedSchema.value)
    ) {
      setSchemasList([...schemasList, selectedSchema]);
      setSelectedSchema("");
    }
  };

  const handleSchemaChange = (index, schema) => {
    const updatedSchemasList = schemasList.map((item, i) =>
      i === index ? schema : item
    );
    setSchemasList(updatedSchemasList);
  };

  const getAvailableSchemas = () => {
    return schemas.filter(
      (schema) =>
        !schemasList.some((selected) => selected.value === schema.value)
    );
  };

  const handleSaveSegment = () => {
    const finalSchema = schemasList.reduce((acc, schema) => {
      acc[schema.value] = schema.label;
      return acc;
    }, {});

    const dataToSend = { segment_name: segmentName, schema: finalSchema };

    axios.post('https://webhook.site/8407f37a-d223-4a40-9046-6f280e7d140a', dataToSend)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        setSnackbarOpen(true);
        handleClose();
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        setSnackbarOpen(true);
        handleClose();
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          p={2}
        >
          <Paper
            elevation={10}
            sx={{
              width: "40%",
              height: "100%",
              position: "absolute",
              right: 0,
              top: 0,
              borderRadius: 0,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                marginTop: "16px",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              Save a Segment
            </Typography>

            <Box sx={{ flex: 1, p: 2 }}>
              <FormControl fullWidth margin="normal">
                <Typography
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "inherit",
                    fontFamily: "Poppins",
                  }}
                >
                  Enter the name of the segment
                </Typography>
                <TextField
                  fullWidth
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  variant="outlined"
                  sx={{
                    boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.15)",
                    borderRadius: 1,
                    fontFamily: "Poppins",
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal" sx={{ marginBottom: "24px" }}>
                <Typography
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "inherit",
                        fontFamily: "Poppins",
                      }}
                >
                  Add Schema to segment
                </Typography>
                <Select
                  value={selectedSchema.value || ""}
                  onChange={(e) =>
                    setSelectedSchema(
                      schemas.find((schema) => schema.value === e.target.value)
                    )
                  }
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 180,
                        overflowY: "scroll",
                        fontFamily: "poppins",
                      },
                    },
                  }}
                  size="small"
                  sx={{
                    width: "100%",
                    backgroundColor: "#F1F1F1",
                    borderRadius: "8px",
                    fontWeight: 900,
                    border: "none !important",
                    "&:focus": {
                      border: "none",
                    },
                    fontFamily: "Poppins",
                  }}
                >
                  {getAvailableSchemas().map((schema) => (
                    <MenuItem
                      sx={{
                        fontFamily: "poppins",
                      }}
                      key={schema.value}
                      value={schema.value}
                    >
                      {schema.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginBottom: "16px",
                  fontFamily: "Poppins",
                  bgcolor: "#149BA1",
                }}
                startIcon={<AddIcon />}
                onClick={handleAddSchema}
              >
                Add New Schema
              </Button>
              <Box
                sx={{
                  marginBottom: "24px",
                  border: "1px solid #e0e0e0",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
                {schemasList.length > 0 ? (
                  schemasList.map((schema, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        padding: "8px",
                        borderBottom:
                          index !== schemasList.length - 1
                            ? "1px solid #e0e0e0"
                            : "none",
                      }}
                    >
                      <FormControl sx={{ width: "70%" }}>
                        <Select
                          value={schema.value}
                          onChange={(e) =>
                            handleSchemaChange(
                              index,
                              schemas.find(
                                (schema) => schema.value === e.target.value
                              )
                            )
                          }
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 180,
                                overflowY: "scroll",
                              },
                            },
                          }}
                          size="small"
                          sx={{
                            width: "100%",
                            backgroundColor: "#F1F1F1",
                            borderRadius: "8px",
                            fontWeight: 900,
                            border: "none !important",
                            "&:focus": {
                              border: "none",
                            },
                            fontFamily: "Poppins",
                          }}
                        >
                          {schemas.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              disabled={schemasList.some(
                                (selected) => selected.value === option.value
                              )}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Typography
                        variant="body1"
                        sx={{
                          marginLeft: "12px",
                          width: "30%",
                          fontFamily: "Poppins",
                        }}
                      >
                        {schema.label}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textAlign: "center" }}
                  >
                    No schemas selected.
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  fontFamily: "Poppins",
                  bgcolor: "#149BA1",
                }}
                onClick={handleSaveSegment}
              >
                Save Segment
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Segment saved successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SegmentModal;