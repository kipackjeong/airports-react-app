import React, { useContext, useState, useEffect, useRef } from "react";
import AppCtx from "../context/context";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";

const useMap = ({
  onClick,
  onIdle,
  children,
  style,
  markersLoc,
  ...options
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const { state } = useContext(AppCtx);

  //#region sets up the map, polyline, and fit bound
  React.useEffect(() => {
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, {});

      const { selectedAirports } = state;

      const flightPlanCoordinates = [
        { lat: selectedAirports[0].lat, lng: selectedAirports[0].lng },
        { lat: selectedAirports[1].lat, lng: selectedAirports[1].lng },
      ];

      const flightPath = new window.google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      const bounds = new window.google.maps.LatLngBounds();
      markersLoc.forEach((loc) =>
        bounds.extend(new window.google.maps.LatLng(loc.lat, loc.lng))
      );
      map.fitBounds(bounds);

      flightPath.setMap(map);
      setMap(map);
    }
  }, [ref, map]);
  //#endregion

  //#region 'ref' deep compare helpers
  const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof window.google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof window.google.maps.LatLng
    ) {
      return new window.google.maps.LatLng(a).equals(
        new window.google.maps.LatLng(b)
      );
    }

    return deepEqual(a, b);
  });
  function useDeepCompareMemoize(value) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }
    return ref.current;
  }

  function useDeepCompareEffectForMaps(callback, dependencies) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }
  //#endregion

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  //#region click and on Idle handle
  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return { ref, map };
};

export default useMap;
