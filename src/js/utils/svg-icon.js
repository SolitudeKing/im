/**
 * SVG 图标工具类
 * 专门针对 i 标签进行 icon- 前缀检查，并自动加载对应的 SVG 文件
 * 支持从配置文件读取配置
 */

class SvgIconLoader {
  constructor(options = {}) {
    // 默认配置
    this.config = {
      iconPath: "assets/icons/",
      iconPrefix: "icon-",
      iconClass: "svg-icon",
      autoInit: true,
      cacheEnabled: true,
      targetTag: "i", // 专门针对 i 标签
      ...options,
    };

    this.loadedIcons = new Set();
    this.configLoaded = false;
  }

  /**
   * 从配置文件加载配置
   */
  async loadConfig() {
    try {
      const response = await fetch("config.json");
      if (!response.ok) {
        console.warn("Config file not found, using default configuration");
        return;
      }

      const configData = await response.json();

      // 合并配置
      if (configData.svgIcon) {
        this.config = {
          ...this.config,
          ...configData.svgIcon,
        };
      }

      this.configLoaded = true;
      console.log("SVG Icon configuration loaded:", this.config);
    } catch (error) {
      console.warn("Failed to load configuration, using defaults:", error);
      this.configLoaded = true;
    }
  }

  /**
   * 初始化 SVG 图标加载器
   */
  async init() {
    await this.loadConfig();

    if (this.config.autoInit) {
      this.scanAndLoadIcons();
    }
  }

  /**
   * 扫描页面中所有 i 标签，检查是否带有 icon- 前缀的类名
   */
  scanAndLoadIcons() {
    // 专门查找 i 标签
    const iElements = document.querySelectorAll(
      `${this.config.targetTag}[class*="${this.config.iconPrefix}"]`,
    );

    iElements.forEach((element) => {
      const classList = Array.from(element.classList);
      const iconClass = classList.find((cls) =>
        cls.startsWith(this.config.iconPrefix),
      );

      if (iconClass) {
        const iconName = iconClass.replace(this.config.iconPrefix, "");
        this.loadIcon(element, iconName);
      }
    });
  }

  /**
   * 加载指定的 SVG 图标到 i 标签中
   * @param {HTMLElement} element - i 标签元素
   * @param {string} iconName - 图标名称（不包含 .svg 扩展名）
   */
  async loadIcon(element, iconName) {
    // 如果启用了缓存且已加载过，直接插入
    if (this.config.cacheEnabled && this.loadedIcons.has(iconName)) {
      this.insertIcon(element, iconName);
      return;
    }

    try {
      const svgPath = `${this.config.iconPath}${iconName}.svg`;
      const response = await fetch(svgPath);

      if (!response.ok) {
        throw new Error(`Failed to load icon: ${svgPath}`);
      }

      const svgContent = await response.text();

      // 如果启用了缓存，缓存 SVG 内容
      if (this.config.cacheEnabled) {
        this.cacheIcon(iconName, svgContent);
      }

      this.insertIcon(element, iconName);
    } catch (error) {
      console.error(`Error loading SVG icon "${iconName}":`, error);
      // 如果加载失败，显示图标名称作为后备
      element.textContent = iconName;
    }
  }

  /**
   * 缓存 SVG 内容
   * @param {string} iconName - 图标名称
   * @param {string} svgContent - SVG 内容
   */
  cacheIcon(iconName, svgContent) {
    // 将 SVG 内容存储到 data 属性中
    document.documentElement.dataset[`icon_${iconName}`] = svgContent;
    this.loadedIcons.add(iconName);
  }

  /**
   * 将 SVG 图标插入到 i 标签中
   * @param {HTMLElement} element - i 标签元素
   * @param {string} iconName - 图标名称
   */
  insertIcon(element, iconName) {
    const svgContent = document.documentElement.dataset[`icon_${iconName}`];

    if (svgContent) {
      // 清空 i 标签内容并插入 SVG
      element.innerHTML = svgContent;

      // 添加公共类名
      element.classList.add(this.config.iconClass);

      // 为 SVG 元素添加默认样式类
      const svgElement = element.querySelector("svg");
      if (svgElement) {
        svgElement.classList.add("icon-svg");
      }
    }
  }

  /**
   * 手动加载指定图标到指定的 i 标签
   * @param {string} iconName - 图标名称
   * @param {HTMLElement|string} target - 目标 i 标签元素或选择器
   */
  async loadIconTo(iconName, target) {
    const element =
      typeof target === "string" ? document.querySelector(target) : target;

    if (!element) {
      console.error(`Target i element not found: ${target}`);
      return;
    }

    // 确保目标元素是 i 标签
    if (element.tagName.toLowerCase() !== this.config.targetTag) {
      console.warn(
        `Target element is not a ${this.config.targetTag} tag:`,
        element,
      );
    }

    await this.loadIcon(element, iconName);
  }

  /**
   * 批量加载图标到所有匹配的 i 标签
   * @param {Array} icons - 图标名称数组
   */
  async loadIcons(icons) {
    const promises = icons.map((iconName) => {
      const elements = document.querySelectorAll(
        `${this.config.targetTag}.${this.config.iconPrefix}${iconName}`,
      );
      return Promise.all(
        Array.from(elements).map((element) => this.loadIcon(element, iconName)),
      );
    });

    await Promise.all(promises);
  }

  /**
   * 重新扫描页面中的 i 标签（用于动态添加的 i 标签）
   */
  rescan() {
    console.log("Rescanning for i tags with icon classes...");
    this.scanAndLoadIcons();
  }

  /**
   * 更新配置
   * @param {Object} newConfig - 新的配置选项
   */
  updateConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig,
    };
    console.log("SVG Icon configuration updated:", this.config);
  }

  /**
   * 获取当前配置
   * @returns {Object} 当前配置
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * 获取已加载的图标列表
   * @returns {Array} 已加载的图标名称数组
   */
  getLoadedIcons() {
    return Array.from(this.loadedIcons);
  }
}

// 创建全局实例
const svgIconLoader = new SvgIconLoader();

// 导出工具类
export { SvgIconLoader, svgIconLoader };

// 自动初始化（当 DOM 加载完成后）
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    svgIconLoader.init();
  });
} else {
  svgIconLoader.init();
}
