# @core-erp/ui Documentation

Complete documentation for the @core-erp/ui package - the centralized UI component library and design system for Core ERP.

## 📚 Documentation Index

### Getting Started

1. **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - **START HERE**
   - What is @core-erp/ui?
   - Why it exists
   - What's included
   - Key features
   - Success metrics

### Architecture & Technical Details

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - **Deep Technical Dive**
   - System architecture
   - Package structure
   - Build system
   - Module exports
   - Component architecture
   - Design system architecture
   - Performance considerations

### Component Reference

3. **[COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)** - **Component Library**
   - All 56 components documented
   - UI components (48 from shadcn/ui)
   - Responsive components (6 custom)
   - Loading components (2)
   - Props, examples, and usage for each

### Design System

4. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - **Design Guidelines**
   - Design philosophy
   - Color system
   - Typography scale
   - Spacing system
   - Layout patterns
   - Animations
   - Responsive design
   - Accessibility standards
   - Customization guide

### Development

5. **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - **For Contributors**
   - Development environment setup
   - Project structure
   - Development workflow
   - Adding new components
   - Building & testing
   - Versioning & releases
   - Contributing guidelines
   - Troubleshooting

### Integration

6. **[PLUGIN_INTEGRATION.md](./PLUGIN_INTEGRATION.md)** - **For Plugin Developers**
   - Quick start
   - Installation
   - Configuration
   - Using components in plugins
   - Styling & theming
   - Best practices
   - Common patterns
   - Troubleshooting

### Migration

7. **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - **For Existing Projects**
   - Pre-migration checklist
   - Step-by-step migration
   - Import path changes
   - Tailwind configuration
   - Removing duplicate code
   - Testing after migration
   - Rollback plan

### API Reference

8. **[API_REFERENCE.md](./API_REFERENCE.md)** - **Complete API Docs**
   - Utility functions (cn, formatters)
   - Hooks (useToast, useIsMobile)
   - Key component APIs
   - Type definitions
   - Usage patterns

---

## 🚀 Quick Navigation

### I want to...

**Understand what @core-erp/ui is**
→ Start with [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

**Learn the technical architecture**
→ Read [ARCHITECTURE.md](./ARCHITECTURE.md)

**Find a specific component**
→ Search [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)

**Understand design tokens and styling**
→ Review [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

**Contribute to @core-erp/ui**
→ Follow [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

**Use @core-erp/ui in my plugin**
→ Follow [PLUGIN_INTEGRATION.md](./PLUGIN_INTEGRATION.md)

**Migrate existing project to @core-erp/ui**
→ Use [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

**Look up a function or component API**
→ Reference [API_REFERENCE.md](./API_REFERENCE.md)

---

## 📖 Reading Paths

### For New Developers

Recommended reading order:

1. [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Understand the what and why
2. [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Explore available components
3. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Learn design principles
4. [API_REFERENCE.md](./API_REFERENCE.md) - Bookmark for reference

**Time**: ~45 minutes

### For Plugin Developers

Fast track to integration:

1. [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Quick overview (10 min)
2. [PLUGIN_INTEGRATION.md](./PLUGIN_INTEGRATION.md) - Integration guide (20 min)
3. [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Component reference (browse as needed)
4. [API_REFERENCE.md](./API_REFERENCE.md) - API lookup (reference)

**Time**: ~30 minutes + practice

### For Core ERP Contributors

Comprehensive understanding:

1. [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Context (15 min)
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical deep dive (30 min)
3. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Contribution workflow (25 min)
4. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design standards (20 min)
5. [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) + [API_REFERENCE.md](./API_REFERENCE.md) - Reference

**Time**: ~90 minutes

### For Migration Projects

Focused migration path:

1. [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Understand benefits (10 min)
2. [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Step-by-step migration (30 min)
3. [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Verify component parity (as needed)
4. [API_REFERENCE.md](./API_REFERENCE.md) - API verification (reference)

**Time**: ~40 minutes + migration execution

---

## 🎯 Quick Reference

### Package Basics

**Installation**:
```bash
# Core ERP / Main application
npm install file:../core-ui

# Plugins
npm install --save-dev @core-erp/ui
```

**Import Examples**:
```typescript
// Components
import { Button, Card, Dialog } from '@core-erp/ui/components/ui'
import { PageHeader } from '@core-erp/ui/components/responsive'

// Utilities
import { cn, formatDate, formatCurrency } from '@core-erp/ui/lib'

// Hooks
import { useToast, useIsMobile } from '@core-erp/ui/hooks'

// Tailwind preset
import uiPreset from '@core-erp/ui/tailwind-preset'
```

### Key Concepts

**56 Total Components**:
- 48 shadcn/ui components (Button, Card, Dialog, Table, Form, etc.)
- 6 responsive components (PageHeader, ResponsiveGrid, etc.)
- 2 loading components (SkeletonCard, SkeletonTable)

**Design System**:
- Semantic color tokens (primary, destructive, muted, etc.)
- Type scale (xs to 5xl)
- Spacing scale (0 to 96)
- Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

**Core Utilities**:
- `cn()` - Class name merging
- Date formatters (formatDate, formatDateTime, formatRelativeTime)
- Number formatters (formatNumber, formatCurrency, formatPercentage)

**Hooks**:
- `useToast()` - Toast notifications
- `useIsMobile()` - Responsive breakpoint detection

---

## 📦 Package Information

**Package Name**: `@core-erp/ui`  
**Version**: 1.0.0  
**Type**: Private npm package (file-based dependency)  
**License**: MIT

**Peer Dependencies**:
- React 18.x
- React DOM 18.x

**Main Technologies**:
- React 18
- TypeScript 5.x
- Tailwind CSS 3.x
- Radix UI
- Vite 5.x

---

## 🔗 External Resources

### shadcn/ui Documentation
Most UI components are from shadcn/ui. For additional examples and advanced usage:
- **Website**: https://ui.shadcn.com
- **Components**: https://ui.shadcn.com/docs/components

### Radix UI Documentation
UI components are built on Radix UI primitives:
- **Website**: https://www.radix-ui.com
- **Primitives**: https://www.radix-ui.com/primitives/docs/overview/introduction

### Tailwind CSS Documentation
For styling and customization:
- **Website**: https://tailwindcss.com
- **Docs**: https://tailwindcss.com/docs

### React Hook Form
For form handling:
- **Website**: https://react-hook-form.com
- **API**: https://react-hook-form.com/api

### Zod
For schema validation:
- **Website**: https://zod.dev
- **Documentation**: https://zod.dev/?id=introduction

---

## 🤝 Contributing

Contributions to @core-erp/ui are welcome! 

**Before contributing**:
1. Read [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
2. Check existing components in [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)
3. Follow patterns in [ARCHITECTURE.md](./ARCHITECTURE.md)
4. Adhere to guidelines in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

**Contribution areas**:
- New components
- Component improvements
- Bug fixes
- Documentation updates
- Performance optimizations
- Accessibility enhancements

---

## 📝 Documentation Standards

This documentation follows these principles:

1. **Comprehensive**: Covers all aspects of the package
2. **Organized**: Logical structure with clear navigation
3. **Practical**: Real-world examples and use cases
4. **Searchable**: Well-indexed with clear headings
5. **Up-to-date**: Reflects current implementation
6. **Accessible**: Clear language, progressive disclosure

---

## 🐛 Found an Issue?

**In Documentation**:
- Check if information is outdated
- Verify code examples work
- Report unclear sections
- Suggest improvements

**In Package**:
1. Check [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) troubleshooting section
2. Verify issue in latest version
3. Report with reproduction steps

---

## 📅 Version History

### 1.0.0 (Current)
- Initial release
- 56 components
- Complete design system
- Full TypeScript support
- Comprehensive documentation

### Future Plans
- [ ] Dark mode full implementation
- [ ] Component Storybook
- [ ] Accessibility testing suite
- [ ] Visual regression tests
- [ ] Additional components as needed
- [ ] Theme customization UI

---

## 💡 Tips for Success

### Learning
- Start with [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- Browse [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) to see what's available
- Refer to [API_REFERENCE.md](./API_REFERENCE.md) when coding

### Building
- Use [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for development workflow
- Follow patterns in existing components
- Test thoroughly before releasing

### Integrating
- Follow [PLUGIN_INTEGRATION.md](./PLUGIN_INTEGRATION.md) for plugins
- Use [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for migrations
- Customize with [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

### Reference
- Bookmark [API_REFERENCE.md](./API_REFERENCE.md)
- Keep [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) handy
- Understand [ARCHITECTURE.md](./ARCHITECTURE.md) for advanced use

---

## 🎓 Learning Resources

### Beginner Level
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Foundational understanding
- [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - Component basics
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design fundamentals

### Intermediate Level
- [PLUGIN_INTEGRATION.md](./PLUGIN_INTEGRATION.md) - Integration patterns
- [API_REFERENCE.md](./API_REFERENCE.md) - API deep dive
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Migration strategies

### Advanced Level
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Advanced development
- Source code exploration

---

## 📞 Support

For questions or support:

1. **Check Documentation**: Most answers are in these docs
2. **Review Examples**: Look at existing usage in core-erp
3. **Ask Team**: Consult with Core ERP team members
4. **Report Issues**: Document and report bugs with reproduction steps

---

## 🏆 Best Practices Summary

### Using @core-erp/ui
- ✅ Import from specific paths for tree-shaking
- ✅ Use semantic color tokens
- ✅ Follow responsive patterns
- ✅ Ensure accessibility
- ✅ Test across devices and browsers

### Contributing to @core-erp/ui
- ✅ Follow existing patterns
- ✅ Write TypeScript types
- ✅ Document new components
- ✅ Test thoroughly
- ✅ Consider accessibility
- ✅ Optimize performance

### Customizing @core-erp/ui
- ✅ Use Tailwind preset
- ✅ Override via theme extension
- ✅ Wrap components for custom behavior
- ✅ Maintain design consistency
- ✅ Document customizations

---

## 📚 Complete Documentation Set

1. ✅ [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - What & Why
2. ✅ [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical Deep Dive
3. ✅ [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md) - All Components
4. ✅ [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design Guidelines
5. ✅ [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development Workflow
6. ✅ [PLUGIN_INTEGRATION.md](./PLUGIN_INTEGRATION.md) - Plugin Integration
7. ✅ [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Migration Guide
8. ✅ [API_REFERENCE.md](./API_REFERENCE.md) - Complete API Docs

---

**Happy Building with @core-erp/ui!** 🚀

*Last Updated: November 10, 2025*

