import React from 'react';
import {SvgXml,} from 'react-native-svg';


export const IconClose = ({size, color = "white", ...props}) => {
    const xml = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
    <g id="icomoon-ignore">
    </g>
    <path fill="${color}" d="M320 274.752l-226.272-226.272-45.248 45.248 226.272 226.272-226.272 226.272 45.248 45.248 226.272-226.272 226.272 226.272 45.248-45.248-226.272-226.272 226.272-226.272-45.248-45.248-226.272 226.272z"></path>
    </svg>
  `;
    return (
        <SvgXml xml={xml} width={size} height={size} {...props}/>
    )
};

export const IconPicture = ({size, color = "white", ...props}) => {
    const xml = `
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
<path fill="${color}" d="M21,0H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V3A3,3,0,0,0,21,0ZM3,2H21a1,1,0,0,1,1,1V15.86L14.18,9.35a5.06,5.06,0,0,0-6.39-.06L2,13.92V3A1,1,0,0,1,3,2ZM21,22H3a1,1,0,0,1-1-1V16.48l7-5.63a3.06,3.06,0,0,1,3.86,0L22,18.47V21A1,1,0,0,1,21,22Z"/>
<path fill="${color}" d="M18,9a3,3,0,1,0-3-3A3,3,0,0,0,18,9Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,18,5Z"/>
</svg>
  `;
    return (
        <SvgXml xml={xml} width={size} height={size} {...props}/>
    )
};

export const IconSend = ({ size, color = "white", ...props }) => {
  const xml = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<path fill="${color}" d="M888.422 129.298c-20.326-20.861-50.409-28.633-78.461-20.452l-654.082 190.206c-29.595 8.222-50.571 31.824-56.222 61.807-5.773 30.515 14.391 69.251 40.733 85.449l204.518 125.698c20.976 12.885 48.050 9.654 65.408-7.852l234.194-235.651c11.787-12.272 31.3-12.272 43.088 0 11.793 11.862 11.793 31.087 0 43.358l-234.598 235.694c-17.399 17.465-20.651 44.663-7.846 65.775l124.963 206.564c14.638 24.548 39.839 38.451 67.482 38.451 3.254 0 6.912 0 10.166-0.41 31.704-4.090 56.912-25.765 66.258-56.445l193.911-653.247c8.533-27.815 0.808-58.085-19.513-78.946z"></path>
</svg>

  `
  return (
    <SvgXml xml={xml} width={size} height={size} {...props} />
  )
}

export const IconCheck = ({ size, color = "white", ...props}) => {
  const xml = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
    <path fill="${color}" d="M288 517.5l339-339 45 45-384 384-178.5-178.5 45-45z"></path>
    </svg>
  `;
  return (
    <SvgXml xml={xml} width={size} height={size} {...props} />
  )
};

export const IconDangerous = ({ size, color = "white", ...props}) => {
  const xml = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
    <path fill="${color}" d="M544.5 504l-120-120 120-120-40.5-40.5-120 120-120-120-40.5 40.5 120 120-120 120 40.5 40.5 120-120 120 120zM504 96l168 168v240l-168 168h-240l-168-168v-240l168-168h240z"></path>
    </svg>
  `;
  return (
    <SvgXml xml={xml} width={size} height={size} {...props} />
  )
};

export const IconInfo = ({ size, color = "white", ...props}) => {
  const xml = `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <path fill="${color}" d="M512 0c-101.264 0-200.254 30.028-284.452 86.287s-149.822 136.223-188.574 229.779c-38.752 93.556-48.891 196.502-29.136 295.821s68.519 190.548 140.123 262.153c71.605 71.606 162.834 120.367 262.152 140.12 99.318 19.759 202.263 9.616 295.819-29.133 93.556-38.754 173.521-104.378 229.781-188.574 56.259-84.201 86.286-183.189 86.286-284.453-0.144-135.746-54.137-265.89-150.123-361.876s-226.132-149.977-361.877-150.124v0zM512 938.668c-84.386 0-166.878-25.023-237.043-71.908-70.165-46.881-124.852-113.52-157.145-191.483s-40.743-163.752-24.28-246.515c16.463-82.765 57.099-158.79 116.77-218.46s135.695-100.306 218.461-116.77c82.763-16.463 168.551-8.014 246.515 24.28s144.603 86.98 191.483 157.145c46.885 70.165 71.908 152.657 71.908 237.043-0.126 113.119-45.117 221.575-125.105 301.563s-188.444 124.979-301.563 125.105z"></path>
  <path fill="${color}" d="M511.991 426.679h-42.664c-11.317 0-22.169 4.495-30.171 12.497s-12.497 18.854-12.497 30.17c0 11.315 4.495 22.17 12.497 30.171s18.854 12.497 30.171 12.497h42.664v256c0 11.315 4.496 22.165 12.497 30.166 8.001 8.006 18.856 12.497 30.171 12.497s22.17-4.492 30.171-12.497c8.001-8.001 12.497-18.851 12.497-30.166v-256c0-22.635-8.993-44.339-24.995-60.342s-37.706-24.994-60.342-24.994z"></path>
  <path fill="${color}" d="M512 341.321c35.347 0 64-28.654 64-64s-28.653-64-64-64c-35.347 0-64 28.654-64 64s28.653 64 64 64z"></path>
  </svg>
  `;
  return (
    <SvgXml xml={xml} width={size} height={size} {...props} />
  )
};

export const IconWarning = ({ size, color = "white", ...props}) => {
  const xml = `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <path fill="${color}" d="M256 46.387l214.551 427.613h-429.103l214.552-427.613zM256 0c-11.035 0-22.070 7.441-30.442 22.324l-218.537 435.556c-16.743 29.766-2.5 54.12 31.652 54.12h434.654c34.15 0 48.396-24.354 31.65-54.12h0.001l-218.537-435.556c-8.371-14.883-19.406-22.324-30.441-22.324v0z"></path>
  <path fill="${color}" d="M288 416c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"></path>
  <path fill="${color}" d="M256 352c-17.673 0-32-14.327-32-32v-96c0-17.673 14.327-32 32-32s32 14.327 32 32v96c0 17.673-14.327 32-32 32z"></path>
  </svg>
  `;
  return (
    <SvgXml xml={xml} width={size} height={size} {...props} />
  )
};

export const IconArrowLeft = ({ size, color = "white", ...props }) => {
  const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
<line stroke="${color}" x1="19" y1="12" x2="5" y2="12"/>
<polyline stroke="${color}" points="12 19 5 12 12 5"/>
</svg>
  `
  return (
    <SvgXml xml={xml} width={size} height={size} {...props} />
  )
}
