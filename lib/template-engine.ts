interface TemplateVariables {
  deceased: {
    fullName: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    birthDate: string;
    deathDate: string;
    lifeSpan: string;
    birthPlace?: string;
    deathPlace?: string;
  };
  family: {
    spouse?: string;
    children: string[];
    childrenList: string;
    grandchildrenCount: number;
    greatGrandchildrenCount: number;
    survivingFamily: string;
  };
  service: {
    type: string;
    date: string;
    time: string;
    dateTime: string;
    venue: string;
    address?: string;
    officiant?: string;
  };
  pallbearers: string[];
  honoraryPallbearers: string[];
  obituary: string;
  serviceOrder: Array<{
    id: string;
    type: string;
    title: string;
    description?: string;
    performer?: string;
    duration?: number;
  }>;
}

export class TemplateEngine {
  private variables: TemplateVariables;

  constructor(variables: TemplateVariables) {
    this.variables = variables;
  }

  /**
   * Process a template string and replace variables
   * Supports dot notation: {{deceased.fullName}}
   * Supports conditionals: {{#if spouse}}...{{/if}}
   * Supports loops: {{#each children}}...{{/each}}
   */
  process(template: string): string {
    let result = template;

    // Process conditionals
    result = this.processConditionals(result);

    // Process loops
    result = this.processLoops(result);

    // Process simple variables
    result = this.processVariables(result);

    // Process special formatting
    result = this.processFormatting(result);

    return result;
  }

  private processConditionals(template: string): string {
    const conditionalRegex = /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
    
    return template.replace(conditionalRegex, (match, condition, content) => {
      const value = this.getNestedValue(condition.trim());
      
      // Check if value exists and is truthy
      if (value && (Array.isArray(value) ? value.length > 0 : value)) {
        return content;
      }
      return '';
    });
  }

  private processLoops(template: string): string {
    const loopRegex = /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
    
    return template.replace(loopRegex, (match, arrayPath, content) => {
      const array = this.getNestedValue(arrayPath.trim());
      
      if (!Array.isArray(array)) return '';
      
      return array.map((item, index) => {
        let itemContent = content;
        
        // Replace {{this}} with the current item
        itemContent = itemContent.replace(/\{\{this\}\}/g, item.toString());
        
        // Replace {{@index}} with the current index
        itemContent = itemContent.replace(/\{\{@index\}\}/g, index.toString());
        
        // If item is an object, replace its properties
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(key => {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            itemContent = itemContent.replace(regex, item[key]?.toString() || '');
          });
        }
        
        return itemContent;
      }).join('');
    });
  }

  private processVariables(template: string): string {
    const variableRegex = /\{\{([^}]+)\}\}/g;
    
    return template.replace(variableRegex, (match, variable) => {
      const value = this.getNestedValue(variable.trim());
      return value?.toString() || '';
    });
  }

  private processFormatting(template: string): string {
    // Process list formatting
    template = template.replace(/\{\{list\s+([^}]+)\}\}/g, (match, arrayPath) => {
      const array = this.getNestedValue(arrayPath.trim());
      if (!Array.isArray(array)) return '';
      
      if (array.length === 0) return '';
      if (array.length === 1) return array[0];
      if (array.length === 2) return `${array[0]} and ${array[1]}`;
      
      const lastItem = array[array.length - 1];
      const otherItems = array.slice(0, -1);
      return `${otherItems.join(', ')}, and ${lastItem}`;
    });

    // Process count formatting
    template = template.replace(/\{\{count\s+([^}]+)\s+"([^"]+)"\s+"([^"]+)"\}\}/g, 
      (match, numberPath, singular, plural) => {
        const count = this.getNestedValue(numberPath.trim());
        const num = parseInt(count?.toString() || '0');
        return `${num} ${num === 1 ? singular : plural}`;
      }
    );

    return template;
  }

  private getNestedValue(path: string): any {
    const keys = path.split('.');
    let value: any = this.variables;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    
    return value;
  }

  /**
   * Helper method to get common formatted strings
   */
  static formatters = {
    familySurvivors: (variables: TemplateVariables): string => {
      const parts: string[] = [];
      
      if (variables.family.spouse) {
        parts.push(`beloved ${variables.family.spouse}`);
      }
      
      if (variables.family.children.length > 0) {
        const childrenStr = variables.family.children.length === 1
          ? `child ${variables.family.children[0]}`
          : `children ${variables.family.children.join(', ')}`;
        parts.push(childrenStr);
      }
      
      if (variables.family.grandchildrenCount > 0) {
        parts.push(`${variables.family.grandchildrenCount} grandchildren`);
      }
      
      if (variables.family.greatGrandchildrenCount > 0) {
        parts.push(`${variables.family.greatGrandchildrenCount} great-grandchildren`);
      }
      
      return parts.join('; ');
    },
    
    pallbearersList: (pallbearers: string[]): string => {
      if (pallbearers.length === 0) return '';
      if (pallbearers.length <= 3) return pallbearers.join(', ');
      
      // Format in two columns for better layout
      const mid = Math.ceil(pallbearers.length / 2);
      const col1 = pallbearers.slice(0, mid);
      const col2 = pallbearers.slice(mid);
      
      return `<div class="pallbearers-columns">
        <div>${col1.join('<br>')}</div>
        <div>${col2.join('<br>')}</div>
      </div>`;
    }
  };
}

// Example template usage:
export const sampleTemplate = `
<div class="memorial-program">
  <header>
    <h1>{{deceased.fullName}}</h1>
    <p class="life-dates">{{deceased.lifeSpan}}</p>
  </header>

  {{#if family.spouse}}
  <section class="family">
    <h2>Survived By</h2>
    <p>{{family.survivingFamily}}</p>
  </section>
  {{/if}}

  {{#if pallbearers}}
  <section class="pallbearers">
    <h3>Pallbearers</h3>
    {{#each pallbearers}}
    <p>{{this}}</p>
    {{/each}}
  </section>
  {{/if}}

  <section class="service-details">
    <h2>{{service.type}}</h2>
    <p>{{service.dateTime}}</p>
    <p>{{service.venue}}</p>
    {{#if service.address}}
    <p>{{service.address}}</p>
    {{/if}}
  </section>

  {{#if serviceOrder}}
  <section class="order-of-service">
    <h2>Order of Service</h2>
    {{#each serviceOrder}}
    <div class="service-item">
      <h4>{{title}}</h4>
      {{#if performer}}
      <p class="performer">{{performer}}</p>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}
</div>
`;