/**
 * Tool Tags Library
 * Easily create and reuse tool tags across the site
 */

const ToolTags = {
  // Icon CDN base URL
  cdnBase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons',

  // Local icons path
  localBase: 'images/SKILLICONS',

  // Tool definitions: { icon, label, isLocal }
  tools: {
    // Design Tools
    figma: {
      icon: 'Figma-logo.svg.png',
      label: 'Figma',
      isLocal: true
    },
    photoshop: {
      icon: 'photoshop-original.svg',
      label: 'Photoshop',
      isLocal: true
    },
    illustrator: {
      icon: 'illustrator/illustrator-plain.svg',
      label: 'Illustrator'
    },
    aftereffects: {
      icon: 'aftereffects-original.svg',
      label: 'After Effects',
      isLocal: true
    },
    blender: {
      icon: 'blender-original.svg',
      label: 'Blender',
      isLocal: true
    },
    sketch: {
      icon: 'sketch/sketch-original.svg',
      label: 'Sketch'
    },

    // Programming Languages
    typescript: {
      icon: 'typescript/typescript-original.svg',
      label: 'TypeScript'
    },
    javascript: {
      icon: 'javascript/javascript-original.svg',
      label: 'JavaScript'
    },
    python: {
      icon: 'python/python-original.svg',
      label: 'Python'
    },
    java: {
      icon: 'java/java-original.svg',
      label: 'Java'
    },
    csharp: {
      icon: 'csharp/csharp-original.svg',
      label: 'C#'
    },
    cpp: {
      icon: 'cplusplus/cplusplus-original.svg',
      label: 'C++'
    },
    swift: {
      icon: 'swift/swift-original.svg',
      label: 'Swift'
    },
    rust: {
      icon: 'rust/rust-original.svg',
      label: 'Rust'
    },
    go: {
      icon: 'go/go-original.svg',
      label: 'Go'
    },

    // Frameworks & Libraries
    react: {
      icon: 'react/react-original.svg',
      label: 'React'
    },
    nextjs: {
      icon: 'nextjs/nextjs-original.svg',
      label: 'Next.js'
    },
    nodejs: {
      icon: 'nodejs/nodejs-original.svg',
      label: 'Node.js'
    },
    vuejs: {
      icon: 'vuejs/vuejs-original.svg',
      label: 'Vue.js'
    },
    angular: {
      icon: 'angular/angular-original.svg',
      label: 'Angular'
    },
    tailwindcss: {
      icon: 'tailwindcss/tailwindcss-original.svg',
      label: 'Tailwind'
    },
    threejs: {
      icon: 'threejs/threejs-original.svg',
      label: 'Three.js'
    },

    // Tools & Platforms
    git: {
      icon: 'git/git-original.svg',
      label: 'Git'
    },
    docker: {
      icon: 'docker/docker-original.svg',
      label: 'Docker'
    },
    aws: {
      icon: 'amazonwebservices/amazonwebservices-original-wordmark.svg',
      label: 'AWS'
    },
    firebase: {
      icon: 'firebase/firebase-plain.svg',
      label: 'Firebase'
    },
    mongodb: {
      icon: 'mongodb/mongodb-original.svg',
      label: 'MongoDB'
    },
    postgresql: {
      icon: 'postgresql/postgresql-original.svg',
      label: 'PostgreSQL'
    },

    // Hardware & Engineering
    arduino: {
      icon: 'arduino/arduino-original.svg',
      label: 'Arduino'
    },
    raspberrypi: {
      icon: 'raspberrypi/raspberrypi-original.svg',
      label: 'Raspberry Pi'
    },

    // ML & AI
    tensorflow: {
      icon: 'tensorflow/tensorflow-original.svg',
      label: 'TensorFlow'
    },
    pytorch: {
      icon: 'pytorch/pytorch-original.svg',
      label: 'PyTorch'
    },
    ml: {
      icon: 'tensorflow/tensorflow-original.svg',
      label: 'ML'
    },

    // Communication & Collaboration
    communication: {
      icon: 'slack/slack-original.svg',
      label: 'Communication'
    },
    slack: {
      icon: 'slack/slack-original.svg',
      label: 'Slack'
    },

    // CAD & 3D
    fusion360: {
      icon: 'Figma-logo.svg.png', // Replace with actual icon if available
      label: 'Fusion 360',
      isLocal: true
    },

    // Music & Audio
    ableton: {
      icon: 'Figma-logo.svg.png', // Replace with actual icon if available
      label: 'Ableton',
      isLocal: true
    },

    // Multi-icon stacks (special entries)
    fullstack: {
      icons: ['typescript', 'react', 'nodejs'],
      label: 'Full Stack'
    }
  },

  // Default inline styles for icons
  iconStyle: `
    height: 20px;
    width: 20px;
    object-fit: contain;
    display: inline-block;
    margin-right: 4px;
    vertical-align: middle;
    border-radius: 4px;
    padding: 2px;
    box-sizing: border-box;
  `.replace(/\s+/g, ' ').trim(),

  // Get icon URL for a tool
  getIconUrl(toolKey) {
    const tool = this.tools[toolKey];
    if (!tool) return null;

    if (tool.isLocal) {
      return `${this.localBase}/${tool.icon}`;
    }
    return `${this.cdnBase}/${tool.icon}`;
  },

  // Create a single tool tag HTML
  createTag(toolKey, customLabel) {
    const tool = this.tools[toolKey];
    if (!tool) {
      console.warn(`Tool "${toolKey}" not found in library`);
      return '';
    }

    // Handle multi-icon stacks
    if (tool.icons) {
      const icons = tool.icons.map((iconKey, index) => {
        const iconUrl = this.getIconUrl(iconKey);
        const marginRight = index < tool.icons.length - 1 ? '2px' : '4px';
        return `<img src="${iconUrl}" alt="${this.tools[iconKey]?.label || iconKey}" style="${this.iconStyle.replace('margin-right: 4px', `margin-right: ${marginRight}`)}">`;
      }).join('');

      return `<span class="tool-tag">${icons}${customLabel || tool.label}</span>`;
    }

    // Single icon tag
    const iconUrl = this.getIconUrl(toolKey);
    const label = customLabel || tool.label;

    return `<span class="tool-tag"><img src="${iconUrl}" alt="${label}" style="${this.iconStyle}">${label}</span>`;
  },

  // Create multiple tool tags
  createTags(toolKeys) {
    return toolKeys.map(key => this.createTag(key)).join('\n');
  },

  // Render tags into a container element
  render(container, toolKeys) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    if (container) {
      container.innerHTML = this.createTags(toolKeys);
    }
  },

  // Auto-render all elements with data-tools attribute
  autoRender() {
    document.querySelectorAll('[data-tools]').forEach(el => {
      const tools = el.dataset.tools.split(',').map(t => t.trim());
      this.render(el, tools);
    });
  },

  // Add a custom tool to the library
  addTool(key, config) {
    this.tools[key] = config;
  },

  // Add a custom multi-icon stack
  addStack(key, iconKeys, label) {
    this.tools[key] = {
      icons: iconKeys,
      label: label
    };
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ToolTags.autoRender());
} else {
  ToolTags.autoRender();
}
