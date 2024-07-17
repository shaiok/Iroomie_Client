import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const renderOption = (props, option) => {
  const { key, ...restProps } = props;
  return (
    <li key={option.id} {...restProps}>
      <Grid container alignItems="center">
        <Grid item sx={{ display: "flex", width: 44 }}>
          <LocationOnIcon sx={{ color: "text.secondary" }} />
        </Grid>
        <Grid
          item
          sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
        >
          <Box component="span" sx={{ fontWeight: "bold" }}>
            {option.structured_formatting.main_text}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {option.structured_formatting.secondary_text}
          </Typography>
        </Grid>
      </Grid>
    </li>
  );
};