$(document).ready(function() {
    const context = $("#canvas")[0].getContext('2d');
    
    $('#generate').on('click', () => {
        const texture_generator = textureGenerator();
        let resolution = $('#resolution').val();
        let lacunarity = $('#lacunarity').val();
        let seed = $('#seed').val();
        let frequency = $('#frequency').val();
        let octaves = $('#octaves').val();
        let presistence = $('#presistence').val();
        let offsetx = $('#offsetx').val();
        let offsety = $('#offsety').val();
        let amplitude = $('#amplitude').val();
        let range = $('#range').val();
        let image_data = context.createImageData(resolution, resolution);

        seed = seed ?? Date.now();

        texture_generator.createTexture(
            image_data, resolution, resolution, seed, frequency, amplitude, octaves, lacunarity, presistence, range, offsetx, offsety
        );

        $('#canvas').prop('width', resolution).prop('height', resolution);
        context.putImageData(image_data, 0, 0)
    });

    $('#save').on('click', () => {
        let data = {
            resolution: $('#resolution').val(),
            lacunarity: $('#lacunarity').val(),
            seed: $('#seed').val(),
            frequency: $('#frequency').val(),
            octaves: $('#octaves').val(),
            presistence: $('#presistence').val(),
            offsetx: $('#offsetx').val(),
            offsety: $('#offsety').val(),
            amplitude: $('#amplitude').val(),
            range: $('#range').val()
        }

        download(JSON.stringify(data), 'noise_settings.json', 'text/plain');
    });

    $('#load').on('click', () => {
        //TODO load settings from file
    });

    function download(data, file_name, content_type) {
        let a = document.createElement("a");
        let file = new Blob([data], {type: content_type});
        a.href = URL.createObjectURL(file);
        a.download = file_name;
        a.click();
        a.remove();
    }
});
