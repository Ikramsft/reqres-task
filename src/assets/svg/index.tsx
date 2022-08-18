/**
 * @format
 */
import React from 'react';
import ArrowClose from './arrow-close.svg';
import ArrowOpen from './arrow-open.svg';
import Avatar from './avatar.svg';
import Camera from './camera.svg';
import Close from './close.svg';
import CurrentLocation from './current-location.svg';
import Location from './location.svg';
import Plus from './plus.svg';
import RadioOff from './radio_off.svg';
import RadioOn from './radio_on.svg';
import RightArrow from './right-arrow.svg';
import Search from './search.svg';

export interface ISVGProps {
  color?: string;
  width?: number;
  height?: number;
}
export function ArrowCloseIcon(props: ISVGProps) {
  return <ArrowClose {...props} name="arrow-close" />;
}
export function ArrowOpenIcon(props: ISVGProps) {
  return <ArrowOpen {...props} name="arrow-open" />;
}
export function AvatarIcon(props: ISVGProps) {
  return <Avatar {...props} name="avatar" />;
}
export function CameraIcon(props: ISVGProps) {
  return <Camera {...props} name="camera" />;
}
export function CloseIcon(props: ISVGProps) {
  return <Close {...props} name="close" />;
}
export function CurrentLocationIcon(props: ISVGProps) {
  return <CurrentLocation {...props} name="current-location" />;
}
export function LocationIcon(props: ISVGProps) {
  return <Location {...props} name="location" />;
}
export function PlusIcon(props: ISVGProps) {
  return <Plus {...props} name="plus" />;
}
export function RadioOffIcon(props: ISVGProps) {
  return <RadioOff {...props} name="radio_off" />;
}
export function RadioOnIcon(props: ISVGProps) {
  return <RadioOn {...props} name="radio_on" />;
}
export function RightArrowIcon(props: ISVGProps) {
  return <RightArrow {...props} name="right-arrow" />;
}
export function SearchIcon(props: ISVGProps) {
  return <Search {...props} name="search" />;
}
