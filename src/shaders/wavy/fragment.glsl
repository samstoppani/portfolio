// precision mediump float;

uniform vec3 uColour;
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vWave;


void main() {

    float wave = vWave * 0.001;

    // vec3 texture = texture2D(uTexture, vec2(vUv.x + uTime / 100.0, vUv.y ) ).rgb;
    vec3 texture = texture2D(uTexture, vec2(vUv.x + uTime / 50.0, vUv.y ) ).rgb;


    gl_FragColor = vec4(texture, 1.0);


    // gl_FragColor = vec4(sin(vUv.x + uTime) * uColour, 1.0);

}