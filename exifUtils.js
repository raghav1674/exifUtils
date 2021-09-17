const fs = require("fs");
const piexif = require("piexifjs");

//Given the pathname of a JPEG file, this function returns the data contained in that file converted into a Base64 string.
const getBase64DataFromJpegFile = (filename) =>
  fs.readFileSync(filename).toString("binary");

//Given [, the pathname of a JPEG file, this function creates a Piexifjs object, which you can use to access its Exif metadata.
module.exports.getExifFromJpegFile = (filename) =>
  piexif.load(getBase64DataFromJpegFile(filename));

// print exif in readable format
module.exports.preetyPrintExif = (exif) => {
  for (const ifd in exif) {
    if (ifd == "thumbnail") {
      const thumbnailData = exif[ifd] === null ? "null" : exif[ifd];
      console.log(`- thumbnail: ${thumbnailData}`);
    } else {
      console.log(`- ${ifd}`);
      for (const tag in exif[ifd]) {
        console.log(
          `    - ${piexif.TAGS[ifd][tag]["name"]}: ${exif[ifd][tag]}`
        );
      }
    }
  }
};

// print the device info
module.exports.deviceInfo = (exif) => {
  console.log(`Device information`);
  console.log("----------------------------");
  console.log(`Make: ${exif["0th"][piexif.ImageIFD.Make]}`);
  console.log(`Model: ${exif["0th"][piexif.ImageIFD.Model]}`);
  console.log(`OS version: ${exif["0th"][piexif.ImageIFD.Software]}\n`);
};

// date info from exif metadata
module.exports.dateTimeInfo = (exif) => {
  const dateTime = exif["0th"][piexif.ImageIFD.DateTime];
  const dateTimeOriginal = exif["Exif"][piexif.ExifIFD.DateTimeOriginal];
  const subsecTimeOriginal = exif["Exif"][piexif.ExifIFD.SubSecTimeOriginal];

  console.log(`Date/time taken`);
  console.log("-------------------------");
  console.log(`DateTime: ${dateTime}`);
  console.log(`DateTimeOriginal: ${dateTimeOriginal}.${subsecTimeOriginal}\n`);
};

// get the location info
module.exports.locationInfo = (exif) => {
  const latitude = exif["GPS"][piexif.GPSIFD.GPSLatitude];
  const latitudeRef = exif["GPS"][piexif.GPSIFD.GPSLatitudeRef];
  const longitude = exif["GPS"][piexif.GPSIFD.GPSLongitude];
  const longitudeRef = exif["GPS"][piexif.GPSIFD.GPSLongitudeRef];

  console.log(`Coordinates`);
  console.log("---------------------");
  console.log(`Latitude: ${latitude} ${latitudeRef}`);
  console.log(`Longitude: ${longitude} ${longitudeRef}\n`);
};


// delete the exif data
module.exports.deleteExifFromImage = (srcImagePath,destImagePath) =>{

	const imageData = getBase64DataFromJpegFile(srcImagePath);
	const scrubbedImageData = piexif.remove(imageData);
	fileBuffer = Buffer.from(scrubbedImageData, 'binary');
	fs.writeFileSync(destImagePath, fileBuffer,{
		encoding: "utf8",
		flag: "w",
		mode: 0o666
	      });
}