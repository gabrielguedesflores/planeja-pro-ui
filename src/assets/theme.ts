export class Spacing {
  private constructor() {}

  // Spacing
  static spacing_stack_xxs = '4px';
  static spacing_stack_xs = '8px';
  static spacing_stack_sm = '16px';
  static spacing_stack_md = '24px';
  static spacing_stack_lg = '32px';
  static spacing_stack_xl = '40px';
  static spacing_stack_xxl = '80px';

  // Inline
  static spacing_inline_xxs = '4px';
  static spacing_inline_xs = '8px';
  static spacing_inline_sm = '16px';
  static spacing_inline_md = '24px';
  static spacing_inline_lg = '32px';
  static spacing_inline_xl = '40px';

  // Inset
  static spacing_inset_xs = '4px';
  static spacing_inset_sm = '8px';
  static spacing_inset_md = '16px';
  static spacing_inset_lg = '24px';

  // Squish
  static spacing_squish_xxs = '4px 8xpx';
  static spacing_squish_xs = '12px 8px';
  static spacing_squish_sm = '8px 16px';
  static spacing_squish_sm_l = '8px 8px 8px 16px';
  static spacing_squish_sm_r = '8px 16px 8px 8px';
  static spacing_squish_sm_b_l = '8px 8px 16px 16px';
  static spacing_squish_md = '12px 16px';
  static spacing_squish_md_l = '12px 12px 12px 16px';
  static spacing_squish_md_r = '12px 16px 12px 12px';
  static spacing_squish_lg = '16px 24px';
  static spacing_squish_lg_l = '16px 16px 16px 24px';
}

export class Fonts {
  private constructor() {}

  static font_family = "'Roboto', sans-serif";
  static font_family_primary = "'Poppins', sans-serif";
  static font_family_secondary = "'Playfair Display', serif";
  
  // Font Size
  static font_size_xl = '32px';
  static font_size_lg = '24px';
  static font_size_xlg = '28px';
  static font_size_md = '20px';
  static font_size_sm = '16px';
  static font_size_xs = '14px';
  static font_size_xxs = '12px';

  // Font Weight
  static font_weight_default = 400;
  static font_weight_md = 500;
  static font_weight_hg = 700;

  // Line Height
  static line_height_default = '100%';
  static line_height_md = '120%';
  static line_height_lg = '140%';
  static line_height_xl = '160%';

  // Letter Spacing
  static letter_spacing_default = '0px';
  static letter_spacing_md = '0.2px';
  static letter_spacing_lg = '0.4px';
}

export class Border {
  private constructor() {}

  // Radius
  static border_radius_sm = '4px';
  static border_radius_md = '8px';
  static border_radius_pill = '499px';

  // Width
  static border_width_sm = '1px';
  static border_width_md = '2px';
  static border_width_lg = '4px';

  // Style
  static border_style_l = '0px 0px 0px 4px';
  static border_style_l_r = '0px 1px';
  static border_style_t = '1px 0x 0px 0px';
}

export class Colors {
  private constructor() {}

  static primary = '#333440';
  static lightPrimary = '#129c8c';
  static lighterPrimary = '#bbf7f0';
  static hoverPrimary = '#0ca996';
  static secondary = '#202123';
  static third = '#444654';
  static danger = '#fe4b61';
  static alert = '#e4a220';
  static info = '#4497b8';
  static disabled = '#d7d7d7';
  static light = '#f7f7f7';
  static dark = '#323538';
  static lightGrey = 'rgb(142, 142, 147)';
  static lighterGrey = 'rgba(0, 0, 0, 0.08)';
  static activeGrey = 'rgba(0, 0, 0, 0.14)';
  static lightTypography = 'rgba(0, 0, 0, 0.54)';
  static typography = '#555555';
  static lightBorder = 'rgba(0, 0, 0, 0.23)';
  static lightYellow = 'rgb(244, 204, 97)';
  static lightBackground = '#F4F3F3';
  static disabledDanger = '#a33b48';

  static neutral_darkest = '#191919';
  static neutral_dark = '#4D4D4D';
  static neutral_medium = '#D9D9D9';
  static neutral_light = '#F7F7F7';
  static neutral_lightest = '#FCFCFC';
  static neutral_brightest = '#FFFFFF';

  // Primary
  static brand_primary_dark = '#004431';
  static brand_primary_pure = '#166649';
  static brand_primary_light = '#009168';
  static brand_primary_lightest = '#BAECDF';

  // Secondary
  static brand_secondary_dark = '#917D40';
  static brand_secondary_pure = '#AB934B';
  static brand_secondary_light = '#F8F3A2';

  // Positive
  static feedback_positive_dark = '#003C52';
  static feedback_positive_pure = '#026B91';
  static feedback_positive_light = '#00A3DE';

  // Negative
  static feedback_negative_dark = '#780C25';
  static feedback_negative_pure = '#910F2D';
  static feedback_negative_light = '#DE1645';

  // Gradient
  static gradient_pure = 'linear-gradient(#166649, #009168)';
}

export class Shadows {
  private constructor() {}

  // Shadows
  static shadow_level_sm = '0px 4px 8px rgba(0, 0, 0, 0.16)';
  static shadow_level_md = '0px 8px 16px rgba(0, 0, 0, 0.16)';

  // Opacity
  static opacity_level_md = 'rgba(25, 25, 25, 0.16)';

  // Blur
  static blur_level_md = 'blur(8px)';
}
