<template>
  <div class="maps">
    <h1>Page Maps</h1>
    <GmapMap
      :center="coordinate"
      :zoom="10"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :position="coordinate"
        :clickable="true"
        :draggable="true"
        @click="clickMarker"
        icon="https://img.icons8.com/color/48/000000/map-pin.png"
      />
    </GmapMap>
    <h3>{{ coordinate }}</h3>
  </div>
</template>

<script>
export default {
  name: "Maps",
  data() {
    return {
      coordinate: {
        lat: 10,
        lng: 10
      }
    };
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        };
      })
      .catch(error => {
        alert(error);
      });
  },
  methods: {
    clickMarker(position) {
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      };
    }
  }
};
</script>
