#!/usr/bin/env tsx
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

interface Token {
  name: string;
  value: string;
}

interface Prop {
  name: string;
  type: string;
  values?: string[];
  items?: Record<string, string>;
  default?: string | boolean | number;
  required?: boolean;
}

interface Component {
  name: string;
  prefix: string;
  category: string;
  props: Prop[];
  slots?: string[];
  events?: string[];
}

const tokens = JSON.parse(readFileSync('packages/spec/tokens.json', 'utf-8'));
const components = JSON.parse(readFileSync('packages/spec/components.json', 'utf-8')).components;

function kebabToPascal(str: string): string {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
}

function generateReactComponent(comp: Component): string {
  const propsName = `${comp.name}Props`;
  const propsList = comp.props.map(p => {
    let type = 'string';
    if (p.type === 'boolean') type = 'boolean';
    else if (p.type === 'number') type = 'number';
    else if (p.type === 'enum') type = p.values!.map(v => `'${v}'`).join(' | ');
    else if (p.type === 'array') type = 'any[]';
    else if (p.type === 'node') type = 'React.ReactNode';
    else if (p.type === 'function') type = '() => void';
    
    const optional = p.required ? '' : '?';
    const defaultValue = p.default !== undefined ? ` = ${JSON.stringify(p.default)}` : '';
    return `${p.name}${optional}: ${type}${defaultValue}`;
  });

  const cssPrefix = comp.prefix;
  const defaultProps = comp.props.filter(p => p.default !== undefined);
  
  return `import React, { forwardRef, HTMLAttributes } from 'react';

export interface ${propsName} extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
${propsList.map(p => `  ${p};`).join('\n')}
}

export const ${comp.name} = forwardRef<HTMLDivElement, ${propsName}>(
  ({ ${comp.props.map(p => p.name).join(', ')}, className = '', children, ...props }, ref) => {
    const classes = ['cn-${cssPrefix}', className].filter(Boolean).join(' ');
    
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

${comp.name}.displayName = '${comp.name}';
`;
}

function generateVueComponent(comp: Component): string {
  const propsList = comp.props.map(p => {
    let type = 'String';
    if (p.type === 'boolean') type = 'Boolean';
    else if (p.type === 'number') type = 'Number';
    else if (p.type === 'array') type = 'Array';
    else if (p.type === 'node') type = 'Object';
    else if (p.type === 'function') type = 'Function';
    
    const defaultVal = p.default !== undefined ? JSON.stringify(p.default) : 'undefined';
    return `    ${p.name}: { type: ${type}, default: ${defaultVal} }`;
  });

  const eventsList = comp.events || [];
  const emits = eventsList.length > 0 ? `\nconst emit = defineEmits<{'${eventsList.join("', '")}': [any] }>();` : '';
  
  return `<script setup lang="ts">
defineProps({
${propsList.join(',\n')}
});${emits}
</script>

<template>
  <div class="cn-${comp.prefix}">
    <slot />
  </div>
</template>
`;
}

function generateSvelteComponent(comp: Component): string {
  const propsList = comp.props.map(p => {
    let typeDecl = '';
    if (p.type === 'boolean') typeDecl = 'boolean';
    else if (p.type === 'number') typeDecl = 'number';
    else if (p.type === 'enum') typeDecl = p.values!.map(v => `'${v}'`).join(' | ');
    else typeDecl = 'string';
    
    const defaultVal = p.default !== undefined ? ` = ${JSON.stringify(p.default)}` : '';
    return `  export let ${p.name}: ${typeDecl}${defaultVal};`;
  });

  return `<script lang="ts">
${propsList.join('\n')}
</script>

<div class="cn-${comp.prefix}">
  <slot />
</div>
`;
}

function generateSolidComponent(comp: Component): string {
  const propsName = `${comp.name}Props`;
  const propsList = comp.props.map(p => {
    let type = 'string';
    if (p.type === 'boolean') type = 'boolean';
    else if (p.type === 'number') type = 'number';
    else if (p.type === 'enum') type = p.values!.map(v => `'${v}'`).join(' | ');
    else if (p.type === 'array') type = 'any[]';
    else if (p.type === 'node') type = 'JSX.Element';
    else if (p.type === 'function') type = '() => void';
    
    const optional = p.required ? '' : '?';
    return `  ${p.name}${optional}?: ${type};`;
  });

  return `import { splitProps, JSX } from 'solid-js';

export interface ${propsName} {
${propsList.join('\n')}
  class?: string;
  children?: JSX.Element;
}

export function ${comp.name}(props: ${propsName}) {
  const [local, others] = splitProps(props, ['class', 'children']);
  
  return (
    <div class={\`cn-${comp.prefix} \${local.class || ''}\`.trim()}>
      {local.children}
    </div>
  );
}
`;
}

function generateFlutterComponent(comp: Component): string {
  return `import 'package:flutter/material.dart';
import '../tokens/theme.dart';

class ${comp.name} extends StatelessWidget {
  const ${comp.name}({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
`;
}

function ensureDir(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function writeComponent(platform: string, comp: Component, content: string, ext: string) {
  const dir = join('packages', platform, 'src', 'components');
  ensureDir(dir);
  const filename = platform === 'vue' ? `Cn${comp.name}.${ext}` : `${comp.name}.${ext}`;
  writeFileSync(join(dir, filename), content);
}

function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  
  console.log('🎨 CronixUI Generator');
  console.log(`📦 ${components.length} components defined`);
  console.log('');
  
  const platforms = ['react', 'vue', 'svelte', 'solid', 'flutter'];
  const generators: Record<string, (c: Component) => string> = {
    react: generateReactComponent,
    vue: generateVueComponent,
    svelte: generateSvelteComponent,
    solid: generateSolidComponent,
    flutter: generateFlutterComponent,
  };
  const extensions: Record<string, string> = {
    react: 'tsx',
    vue: 'vue',
    svelte: 'svelte',
    solid: 'tsx',
    flutter: 'dart',
  };
  
  for (const platform of platforms) {
    console.log(`\n📁 Generating ${platform}...`);
    let count = 0;
    
    for (const comp of components) {
      const generator = generators[platform];
      const ext = extensions[platform];
      const content = generator(comp);
      writeComponent(platform, comp, content, ext);
      count++;
    }
    
    console.log(`   ✅ ${count} components generated`);
  }
  
  console.log('\n✨ Done!');
}

main();
