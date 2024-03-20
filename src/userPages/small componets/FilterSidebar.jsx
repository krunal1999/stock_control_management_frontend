import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const options = [
  { label: "All", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "Featured", value: "FEATURED" },
  { label: "Hot Selling", value: "HOT SELLING" },
];

const FilterSidebar = ({ pt, caSet, ct }) => {
  const [checked, setChecked] = useState(null);

  const handleChange = (value) => {
    setChecked(value);
    pt(value);
    ct(value);
  };

  let ar = [...caSet];

  let br = [];
  br.push({ label: "ALL", value: "ALL" });

  ar.forEach((a) => {
    let asda = {
      label: "",
      value: "",
    };
    asda.label = a;
    asda.value = a;
    br.push(asda);
  });

  return (
    <>
      <Box
        sx={{
          height: 40,
          bgcolor: "	#011f4b",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: 24 }}>Filter</Typography>
      </Box>

      <Stack spacing={1}>
        <Box>
          <Typography
            sx={{
              height: 30,
              bgcolor: "	#f3f6f4",
              color: "#000",
              fontSize: 20,
              padding: 1,
            }}
          >
            Products
          </Typography>

          <Divider />

          <Box
            sx={{
              height: 170,
              bgcolor: "	#f3f6f4",
              color: "#000",
              paddingLeft: 1,
            }}
          >
            {options.map((option) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked === option.value}
                      onChange={() => handleChange(option.value)}
                      label={option.label}
                    />
                  }
                  label={option.label}
                />
                <br />
              </>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              height: 30,
              bgcolor: "	#f3f6f4",
              color: "#000",
              fontSize: 20,
              padding: 1,
            }}
          >
            Category
          </Typography>

          <Divider />
          <Box
            sx={{
              bgcolor: "	#f3f6f4",
              color: "#000",
              paddingLeft: 1,
            }}
          >
            {br.map((option) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked === option.value}
                      onChange={() => handleChange(option.value)}
                      label={option.label}
                    />
                  }
                  label={option.label}
                />
                <br />
              </>
            ))}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default FilterSidebar;
