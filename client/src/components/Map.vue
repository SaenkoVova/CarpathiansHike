<template>
    <v-container fluid class="pa-0">
        <div v-if="route" style="height: 800px;">
            <l-map
            :zoom="zoom"
            :center="[route.start.lt, route.start.lg]"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-geo-json :geojson="geoJson" :optionsStyle="{color: 'red'}"></l-geo-json>
                <l-marker :lat-lng="[route.start.lt, route.start.lg]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            :icon-url="require(`../assets/location-pin.png`)" >
                    </l-icon>
                </l-marker>
                <l-marker :lat-lng="[route.end.lt, route.end.lg]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            :icon-url="require(`../assets/location-pin.png`)" >
                    </l-icon>
                </l-marker>
                
            </l-map>
        </div>
        <div v-if="place" style="height: 400px">
            <l-map
            :zoom="13"
            :center="[place.lt, place.lg]"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-geo-json :geojson="geoJson" :optionsStyle="{color: '#686de0'}"></l-geo-json>
                <l-marker :lat-lng="[place.lt, place.lg]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            :icon-url="require(`../assets/location-pin.png`)" >
                    </l-icon>
                </l-marker>
            </l-map>
        </div>
        <div v-if="loadFullMap && !loading" style="height: 100vh">
            <l-map
            :zoom="10"
            :center="[48.0, 24.0]"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker v-for="(location, index) in mapLocations" :lat-lng="[location.lt, location.lg]" :key="index">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            :icon-url="require(`../assets/location-pin.png`)" >
                    </l-icon>
                </l-marker>
            </l-map>
        </div>
    </v-container>
</template>

<script>

import {LMap, LTileLayer, LMarker, LIcon, LGeoJson} from 'vue2-leaflet';
import Axios from "axios";
import proxy from "@/proxy";

export default {
    props: {
        'route': {
            type: Object,
            required: false
        },
        'place': {
            type: Object,
            required: false
        },
        'loadFullMap': {
            type: String,
            required: false
        }
    },
    data () {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 12,
            iconSize: 40,
            geoJson: null,
            loading: false,
            mapLocations: []
        };
    },
    computed: {
        dynamicSize () {
            return [this.iconSize, this.iconSize * 1.15];
        },
        dynamicAnchor () {
            return [this.iconSize / 2, this.iconSize * 1.15];
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LGeoJson
    },
    methods: {
        zoomUpdated (zoom) {
            this.zoom = zoom;
        },
        centerUpdated (center) {
            this.center = center;
        },
        boundsUpdated (bounds) {
            this.bounds = bounds;
        },
        loadPlaces() {
          this.loading = true;
          Axios.get(`${proxy.domen}/places/getMapLocations`)
            .then(res => {
              console.log(res)
              this.mapLocations = res.data
              this.loading = false;
            })
        }
    },
    created() {
        if(this.route) {
            this.geoJson = require(`../../public/geoJson/${this.route.route.geoJson}`)
        }
        if(this.place) {
            this.geoJson = require(`../../public/geoJson/${this.place.geoJson}`)
        }
        if(this.loadFullMap) {
          this.loadPlaces();
        }
    }
}
</script>

<style>

</style>
