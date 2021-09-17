const exifUtils = require("./exifUtils")

const palm1Exif = exifUtils.getExifFromJpegFile("./images/palm-01.jpg");
// read exif in clean format
exifUtils.preetyPrintExif(palm1Exif)
// get device info
exifUtils.deviceInfo(palm1Exif)
// get location info
exifUtils.locationInfo(palm1Exif)
// get date info
exifUtils.dateTimeInfo(palm1Exif)

// delete exif from image
exifUtils.deleteExifFromImage('./images/palm-02.jpg','palm-exif.jpg');

// print to check if there is any exif data left 
exifUtils.preetyPrintExif(exifUtils.getExifFromJpegFile('palm-exif.jpg'));