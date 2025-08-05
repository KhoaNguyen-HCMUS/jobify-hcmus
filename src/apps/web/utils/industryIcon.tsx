import { 
  Code, 
  Megaphone, 
  TrendingUp, 
  Calculator, 
  Users, 
  Headphones, 
  GraduationCap, 
  Heart, 
  Wrench, 
  Palette, 
  Truck, 
  Building2 
} from 'lucide-react';

export function getIndustryIcon(industryName: string) {
  const name = industryName.toLowerCase();
  
  if (name.includes('software') || name.includes('it')) {
    return Code;
  }
  if (name.includes('marketing') || name.includes('advertising')) {
    return Megaphone;
  }
  if (name.includes('sales') || name.includes('business')) {
    return TrendingUp;
  }
  if (name.includes('accounting') || name.includes('finance')) {
    return Calculator;
  }
  if (name.includes('human resources') || name.includes('hr')) {
    return Users;
  }
  if (name.includes('customer support') || name.includes('service')) {
    return Headphones;
  }
  if (name.includes('education') || name.includes('training')) {
    return GraduationCap;
  }
  if (name.includes('healthcare') || name.includes('medical')) {
    return Heart;
  }
  if (name.includes('engineering') || name.includes('construction')) {
    return Wrench;
  }
  if (name.includes('design') || name.includes('creative')) {
    return Palette;
  }
  if (name.includes('operations') || name.includes('logistics')) {
    return Truck;
  }
  
  return Building2;
} 