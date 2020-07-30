sass/
|
|– abstracts/ 包含了整个项目中使用到的 Sass 辅助工具，这里存放着每一个全局变	量、函数、混合宏和占位符 编译后这里不应该输出任何 CSS，单纯的只是一些 Sass 辅助工具。也会被称为 helpers/ 或 utilities
|   |– _variables.scss    # Sass Variables
|   |– _functions.scss    # Sass Functions
|   |– _mixins.scss       # Sass Mixins
|   |– _placeholders.scss # Sass Placeholders
|
|– base/ 存放项目中的模板文件
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Typography rules
|   …                     # Etc.
|
|– components/ 包含各类具体模块，基本上是所有的独立模块，比如一个滑块、一个加	 载块、一个部件 会被称为 modules/
|   |– _buttons.scss      # Buttons
|   |– _carousel.scss     # Carousel
|   |– _cover.scss        # Cover
|   |– _dropdown.scss     # Dropdown
|   …                     # Etc.
|
|– layout/ 存放构建网站或者应用程序使用到的布局部分存放网站主体（头部、尾部、	   导航栏、侧边栏…）的样式表、栅格系统甚至是所有表单的 CSS 样式
|   |– _navigation.scss   # Navigation
|   |– _grid.scss         # Grid system
|   |– _header.scss       # Header
|   |– _footer.scss       # Footer
|   |– _sidebar.scss      # Sidebar
|   |– _forms.scss        # Forms
|   …                     # Etc.
|
|– pages/ 页面有特定的样式
|   |– _home.scss         # Home specific styles
|   |– _contact.scss      # Contact specific styles
|   …                     # Etc.
|
|– themes/ 多种主题
|   |– _theme.scss        # Default theme
|   |– _admin.scss        # Admin theme
|   …                     # Etc.
|
|– vendors/ 用来存放所有外部库和框架
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
`– main.scss              # 主文件 除 @import 和注释外，该文件不应该包含任何其他代码