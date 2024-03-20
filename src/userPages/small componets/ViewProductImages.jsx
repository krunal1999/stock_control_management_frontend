import { Box, CardMedia, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

const ViewProductImages = ({ img1 = { images: [] } }) => {
  const [currentImg, setCurrentImg] = useState("");
  useEffect(() => {
    if (img1.images) {
      const defaultImg = `data:${img1.images[0].fileType};base64,${img1.images[0].imageData}`;
      setCurrentImg(defaultImg);
    }
  }, [img1.images]);

  console.log(currentImg);
  return (
    <>
      <Stack direction="row" spacing={4}>
        <Box sx={{ width: "20%" }}>
          <Stack spacing={3}>
            {img1.images &&
              img1.images.map((image, imageIndex) => (
                <CardMedia
                  component="img"
                  key={`${img1.id}-${image.id}`}
                  onClick={() =>
                    setCurrentImg(
                      `data:${image.fileType};base64,${image.imageData}`
                    )
                  }
                  sx={{
                    height: 100,
                    width: "100%",
                    objectFit: "cover",
                    border: "0px solid black",
                  }}
                  image={`data:${image.fileType};base64,${image.imageData}`}
                  alt={image.fileName}
                />
              ))}
          </Stack>
        </Box>

        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
            zIndex: 122,
            height: 600
          }}
        >
          {currentImg && (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "qw",
                  isFluidWidth: true,
                  src: currentImg,
                },
                largeImage: {
                  src: currentImg,
                  width: 1500,
                  height: 1800,
                },
                isHintEnabled: true,
              }}
            />
          )}
        </Box>
      </Stack>

      <Box></Box>
    </>
  );
};

export default ViewProductImages;
