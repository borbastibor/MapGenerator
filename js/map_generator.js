function mapGenerator() {
    const API = {
        createMap(image_data_ref, width, height, seed, freq, amp, oct, lac, pres, rng, offset) {
            const openSimplex = openSimplexNoise(seed);
            
            let x, y, index = 0;
            for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                    const value = openSimplex.sum('noise2D', {x:x + offset.x, y:y + offset.y}, freq, amp, oct, lac, pres, rng) * 128;
                    image_data_ref.data[index++] = value;
                    image_data_ref.data[index++] = value;
                    image_data_ref.data[index++] = value;
                    image_data_ref.data[index++] = 255;
                }
            }
        }
    }

    return API;
}