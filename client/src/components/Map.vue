<template>
    <v-container fluid class="pa-0">
        <div v-if="route" style="height: 800px;">
            <l-map
            :zoom="zoom"
            :center="[route.startLt, route.startLg]"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker :lat-lng="[route.startLt, route.startLg]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            :icon-url="require(`../assets/location-pin.png`)" >
                    </l-icon>
                </l-marker>
                <l-marker :lat-lng="[route.endLt, route.endLg]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            :icon-url="require(`../assets/location-pin.png`)" >
                    </l-icon>
                </l-marker>
                <l-geo-json :geojson="route.geoJson" :optionsStyle="{color: 'red'}"></l-geo-json>
            </l-map>
        </div>
        <div v-if="place" style="height: 400px">
            <l-map
            :zoom="15"
            :center="[place.lt, place.lg]"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker :lat-lng="[place.lt, place.lg]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            :icon-url="require(`../assets/location-pin.png`)" >
                    </l-icon>
                </l-marker>
            </l-map>
        </div>
        <div v-if="loadFullMap" style="height: 100vh">
            <l-map
            :zoom="15"
            :center="[50.0, 50.0]"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-marker :lat-lng="[50.0, 50.0]">
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
        }
    },
}
</script>

<style>

</style>