const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelectorAll('.filter-info .name'),
filterValue = document.querySelectorAll('.filter-info .value'),
filterSlider = document.querySelectorAll('.slider input'),
previewImg = document.querySelector('.preview-img img'),
chooseImgBtn = document.querySelector('.choose-img');

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
    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
chooseImgBtn.addEventListener('click', () => fileInput.click());

