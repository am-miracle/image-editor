const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
rotateOptions = document.querySelectorAll('.rotate button'),
previewImg = document.querySelector('.preview-img img'),
resetFilterBtn = document.querySelector('.reset-filter'),
chooseImgBtn = document.querySelector('.choose-img'),
saveImgBtn = document.querySelector('.save-img');



const loadImage = () => {
    let file = fileInput.files[0] //getting user selected file
    if(!file) return; // return if user has not selected a file
    previewImg.src = URL.createObjectURL(file) // passing file url as preview img src
    previewImg.addEventListener('load', () => {
        resetFilterBtn.click(); // clicking reset btn, so that the filter value reset if the user select new image
        document.querySelector('.container').classList.remove('disable')
    })
}

let brightness = 1, saturation = 1, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}) saturate(${saturation}) invert(${inversion}) grayscale(${grayscale})`;
}

filterOptions.forEach(option => {
    option.addEventListener('click', () => { // adding click event listener to all filter buttons
        document.querySelector('.filter .active').classList.remove("active");
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = '200';
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if (option.id === "saturation") {
            filterSlider.max = '200';
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === "inversion") {
            filterSlider.max = '100';
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else {
            filterSlider.max = '100';
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); // getting selected filter btn

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    }
    else {
        grayscale = filterSlider.value;
    }
    applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener('click', () => { // adding click event to all rotate/flip buttons
        if(option.id === 'left') { // if clicked btn is left rotate, decrement rotate value by -90
            rotate -= 90;
        } else if (option.id === "right") { // if clicked btn is left rotate, increment rotate value by +90
            rotate += 90;
        }
        else if(option.id === 'horizontal') {
            // if flipHorizontal value is 1, set this value to -1 else set 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }else {
            // if flipVertical value is 1, set this value to -1 else set 1
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters();

    })
})

const resetFilter = () => {
    // resetting all variable value to its default value
    brightness = 1; saturation = 1; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // clicking brightness btn, so the brightness is selected by default
    applyFilters()
}

const saveImage = () => {
    const canvas = document.createElement("canvas"); //creating a canvas element
    const ctx = canvas.getContext('2d'); // convas.getContext return a drawing context on canvas
    canvas.width = previewImg.naturalWidth; // setting canvas width to actual image width
    canvas.height = previewImg.naturalHeight; // setting canvas height to actual image height

    // applying users selected filters to canvas filter
    ctx.filter =  `brightness(${brightness}) saturate(${saturation}) invert(${inversion}) grayscale(${grayscale})`;
    ctx.translate(canvas.width / 2, canvas.height /2); // translating canvas from center
    if (rotate !== 0) { // if rotate isn't value, rotate the canvas
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal, flipVertical ) // flip canvas, vertically/horizontally
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement('a'); // creating a link tag
    link.download = 'image.jpeg'; // passing <a> tag download value to "image.jpg"
    link.href = canvas.toDataURL(); // passing <a> href value to canvas data url
    link.click(); // clicking on the <a> tag to download the image
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
resetFilterBtn.addEventListener('click', resetFilter);
saveImgBtn.addEventListener('click', saveImage);
chooseImgBtn.addEventListener('click', () => fileInput.click());

