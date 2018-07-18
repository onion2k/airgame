#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_puck;

float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
    return step(threshold, value);
  #endif  
}

float circle(in vec2 st, float radius) {
  return length(st - 0.5) - radius;
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 col = 0.5 + 0.5*cos(u_time + uv.xyx + vec3(0,2,4));

    vec2 pv = 0.5 - (u_puck.xy / u_resolution.xy);

    uv -= pv;

    float c = circle(uv, 0.025);

    c = aastep(0.025, c);

    vec3 color = vec3(c);

    gl_FragColor = vec4(color,1.0);
}