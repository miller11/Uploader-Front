<template>
  <header>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <!-- Slide One - Set the background image for this slide in the line below -->
        <div class="carousel-item active" style="background-image: url('https://storage.googleapis.com/www.ic-miller.net/images/Big%20Stopper.jpg')">
          <div class="carousel-caption d-none d-md-block">
            <!--<h3>First Slide</h3>-->
            <p>Waimea bay</p>
          </div>
        </div>
        <!-- Slide Two - Set the background image for this slide in the line below -->
        <div class="carousel-item" style="background-image: url('https://storage.googleapis.com/www.ic-miller.net/images/Colton-Butterfly.jpg')">
          <div class="carousel-caption d-none d-md-block">
            <!--<h3>Second Slide</h3>-->
            <p>Colton swimming butterfly</p>
          </div>
        </div>
        <!-- Slide Three - Set the background image for this slide in the line below -->
        <div class="carousel-item" style="background-image: url('https://storage.googleapis.com/www.ic-miller.net/images/Milky%20Way-XL.jpg')">
          <div class="carousel-caption d-none d-md-block">
            <!--<h3>Third Slide</h3>-->
            <p>Milky way picture taken in Hawaii</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
