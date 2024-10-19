"use client";
import { useState } from "react";

import { Typography, Box, Paper, Button, TextField } from "@mui/material";

import { fetchLocationDataGeoNames, convertTimezones } from "./util.js";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function MainPage() {
  const [isCalculated, setIsCalculated] = useState(false);

  const [pointOne, setPointOne] = useState({
    lat: null,
    lng: null,
  });

  const [pointOneInfo, setPointOneInfo] = useState({
    countryName: null,
    regionName: null,
    zoneName: null,
    timestamp: null,
    timestampAMPM: null,
    pm: null,
  });

  const [pointTwo, setPointTwo] = useState({
    lat: null,
    lng: null,
  });

  const [pointTwoInfo, setPointTwoInfo] = useState({
    countryName: null,
    regionName: null,
    zoneName: null,
    timestamp: null,
    timestampAMPM: null,
    pm: null,
  });

  const [currentTextFieldValueOne, setCurrentTextFieldValueOne] =
    useState(null);
  const [currentTextFieldValueTwo, setCurrentTextFieldValueTwo] =
    useState(null);

  const handleResetClick = () => {
    setPointOne({ lat: null, lng: null });
    setPointTwo({ lat: null, lng: null });

    setPointOneInfo({
      countryName: null,
      regionName: null,
      zoneName: null,
      timestamp: null,
      timestampAMPM: null,
      pm: null,
    });

    setPointTwoInfo({
      countryName: null,
      regionName: null,
      zoneName: null,
      timestamp: null,
      timestampAMPM: null,
      pm: null,
    });

    setCurrentTextFieldValueOne(null);
    setCurrentTextFieldValueTwo(null);

    setIsCalculated(false);
  };

  const handleMapClick = (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;

    setLatLng(lat, lng);
  };

  const handleCalculateClick = async () => {
    const {
      countryName: countryNameOne,
      regionName: regionNameOne,
      zoneName: zoneNameOne,
      timestamp: timestampOne,
      timestampAMPM: timestampAMPMOne,
      pm: pmOne,
    } = await fetchLocationDataGeoNames(pointOne.lat, pointOne.lng);

    const {
      countryName: countryNameTwo,
      regionName: regionNameTwo,
      zoneName: zoneNameTwo,
      timestamp: timestampTwo,
      timestampAMPM: timestampAMPMTwo,
      pm: pmTwo,
    } = await fetchLocationDataGeoNames(pointTwo.lat, pointTwo.lng);

    setPointOneInfo({
      countryName: countryNameOne,
      regionName: regionNameOne,
      zoneName: zoneNameOne,
      timestamp: timestampOne,
      timestampAMPM: timestampAMPMOne,
      pm: pmOne,
    });

    setPointTwoInfo({
      countryName: countryNameTwo,
      regionName: regionNameTwo,
      zoneName: zoneNameTwo,
      timestamp: timestampTwo,
      timestampAMPM: timestampAMPMTwo,
      pm: pmTwo,
    });

    setCurrentTextFieldValueOne(timestampOne);
    setCurrentTextFieldValueTwo(timestampTwo);

    setIsCalculated(true);
  };

  const timeFormatRegex = /^(\d{1,2}):(\d{2})$/;

  const handleFirstTextFieldChange = (event) => {
    let curText = event.target.value;
    setCurrentTextFieldValueOne(curText);

    if (timeFormatRegex.test(curText)) {
      let [, hours] = curText.match(timeFormatRegex);

      hours = hours.padStart(2, "0");

      curText = curText.replace(/^\d{1,2}/, hours);

      let convertedTimestamp = convertTimezones(
        pointOneInfo.zoneName,
        pointTwoInfo.zoneName,
        curText
      );

      setCurrentTextFieldValueTwo(convertedTimestamp);
    } else {
      setCurrentTextFieldValueTwo(".......");
    }
  };

  const handleSecondTextFieldChange = (event) => {
    let curText = event.target.value;
    setCurrentTextFieldValueTwo(curText);

    if (timeFormatRegex.test(curText)) {
      let [, hours] = curText.match(timeFormatRegex);

      hours = hours.padStart(2, "0");

      curText = curText.replace(/^\d{1,2}/, hours);

      let convertedTimestamp = convertTimezones(
        pointTwoInfo.zoneName,
        pointOneInfo.zoneName,
        curText
      );

      setCurrentTextFieldValueOne(convertedTimestamp);
    } else {
      setCurrentTextFieldValueOne(".......");
    }
  };

  const setLatLng = (lat, lng) => {
    // First point hasn't been selected yet
    if (pointOne.lat === null || pointOne.lng === null) {
      setPointOne({ lat, lng });
      // First point has been selected, second has not
    } else if (pointTwo.lat === null || pointTwo.lng === null) {
      setPointTwo({ lat, lng });
    }
    // Both points selected, don't do anything
  };

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "#bbdff2",
        width: "790px",
        height: "600px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "400px", width: "790px", paddingBottom: "10px" }}>
          <Map
            options={{
              disableDefaultUI: true,
            }}
            mapId={"ff744f6059f403d6"}
            onClick={handleMapClick}
            defaultZoom={2}
            defaultCenter={{ lat: 25, lng: -40 }}
          >
            {pointOne.lat !== null && pointOne.lng !== null && (
              <AdvancedMarker position={pointOne}>
                <Pin
                  background={"#6989b3"}
                  borderColor={"#2d3e5e"}
                  glyphColor={"#d0e7f5"}
                />
              </AdvancedMarker>
            )}

            {pointTwo.lat !== null && pointTwo.lng !== null && (
              <AdvancedMarker position={pointTwo}>
                <Pin
                  background={"#6989b3"}
                  borderColor={"#2d3e5e"}
                  glyphColor={"#d0e7f5"}
                />
              </AdvancedMarker>
            )}
          </Map>
        </div>
      </APIProvider>

      <IconButton
        onClick={handleResetClick}
        aria-label="delete"
        sx={{ position: "absolute", bottom: 12, left: 7 }}
      >
        <DeleteIcon sx={{ color: "white" }} />
      </IconButton>

      <Button
        variant="contained"
        sx={{ boxShadow: "none", backgroundColor: "#6a96cc" }}
        disabled={
          !(pointOne.lat && pointOne.lng && pointTwo.lat && pointTwo.lng)
        }
        onClick={handleCalculateClick}
        disableRipple
      >
        calculate
      </Button>

      {isCalculated && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                height: 30,
                width: 800,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "45px",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {pointOneInfo.regionName}, {pointOneInfo.countryName}
              </Typography>
            </Box>

            <Box
              sx={{
                height: 30,
                width: 800,
                justifyContent: "center",
                alignItems: "center",
                marginRight: "45px",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {pointTwoInfo.regionName}, {pointTwoInfo.countryName}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: 60,
                width: 708,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "45px",
              }}
            >
              <TextField
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                    fontSize: "2.0rem",
                    height: "50px",
                    width: "85px",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline.Mui-focused:after": {
                    borderBottom: "none",
                  },
                }}
                onChange={handleFirstTextFieldChange}
                value={currentTextFieldValueOne}
              ></TextField>
            </Box>

            <Box
              sx={{
                height: 60,
                width: 709,
                justifyContent: "center",
                alignItems: "center",
                marginRight: "45px",
              }}
            >
              <TextField
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                    fontSize: "2.0rem",
                    height: "50px",
                    width: "85px",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline.Mui-focused:after": {
                    borderBottom: "none",
                  },
                }}
                onChange={handleSecondTextFieldChange}
                value={currentTextFieldValueTwo}
              ></TextField>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}
