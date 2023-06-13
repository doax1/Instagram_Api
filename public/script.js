window.onload = function() {
  fetch('http://localhost:3000/api/instagram')
    .then(response => response.json())
    .then(data => {
      const carouselInner = document.getElementById('carousel-inner');
      const carouselIndicators = document.getElementById('carousel-indicators');

      data.forEach((imageUrl, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        if (index === 0) {
          slide.classList.add('active');
        }

        const img = document.createElement('img');
        img.src = imageUrl;
        img.classList.add('d-block', 'w-100');

        slide.appendChild(img);
        carouselInner.appendChild(slide);

        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-slide-to', index);
        if (index === 0) {
          indicator.classList.add('active');
        }

        carouselIndicators.appendChild(indicator);
      });
    })
    .catch(error => console.log(error));
};
