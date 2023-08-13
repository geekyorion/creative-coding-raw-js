const convertImageToBase64 = (imgUrl, callback) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgUrl;

    image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL();
        callback && callback(dataUrl);
    }
}

convertImageToBase64("image_path", (encoded) => {
    console.log(encoded);
});
