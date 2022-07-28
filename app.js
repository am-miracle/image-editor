const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
rotateOptions = document.querySelectorAll('.rotate button'),
previewImg = document.querySelector('.preview-img img'),
resetFilterBtn = document.querySelector('.reset-filter'),
chooseImgBtn = document.querySelector('.choose-img');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}) saturate(${saturation}) invert(${inversion}) grayscale(${grayscale})`;
}

const loadImage = () => {
    let file = fileInput.files[0] //getting user selected file
    if(!file) return; // return if user has not selected a file
    previewImg.src = URL.createObjectURL(file) // passing file url as preview img src
    previewImg.addEventListener('load', () => {
        document.querySelector('.container').classList.remove('disable')
    })
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
    brightness = 10; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // clicking brightness btn, so the brightness is selected by default
    applyFilters()
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
resetFilterBtn.addEventListener('click', resetFilter);
chooseImgBtn.addEventListener('click', () => fileInput.click());

