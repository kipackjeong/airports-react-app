import { ContactSupportOutlined } from "@mui/icons-material";

export function calculateDistance(point1, point2) {
  function calcCrow() {
    var lat1 = point1.lat;
    var lat2 = point2.lat;

    var lng1 = point1.lng;
    var lng2 = point2.lng;

    var R = 6371 * 0.53996; // n mile
    var dLat = toRad(lat2 - lat1);
    var dLng = toRad(lng2 - lng1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(1);
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  return calcCrow();
}
