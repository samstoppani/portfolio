
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform float radius;

varying vec2 vPUv;
varying vec2 vUv;

vec3 ApplyHue(vec3 col, float hueAdjust)
{
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hueAdjust);
    return col * cosAngle + cross(k, col) * sin(hueAdjust) + k * dot(k, col) * (1.0 - cosAngle);
}

void main() {
	vec4 color = vec4(0.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// Pixel color
	vec4 colA = texture2D(uTexture, puv);

	// Circle
	float border = 0.3;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);

	vec3 colorFinal = ApplyHue(colA.xyz, uTime);

    gl_FragColor = vec4(colorFinal, t);
}