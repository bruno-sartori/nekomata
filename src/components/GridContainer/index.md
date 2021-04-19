React component example:

```js { "props": { "style": { "backgroundColor": "rgb(240, 244, 255)"  } } }
const GridItem = require('../GridItem').default;
const columnStyle = { backgroundColor: '#d7f7ff', border: '1px solid #3b86c1', color: '#000' };

<GridContainer style={{ padding: 0 }}>
  <GridItem colSpan={12} style={columnStyle}>col-12</GridItem>
  <GridItem colSpan={6} style={columnStyle}>col-6</GridItem>
  <GridItem colSpan={6} style={columnStyle}>col-6</GridItem>
  <GridItem colSpan={4} style={columnStyle}>col-4</GridItem>
  <GridItem colSpan={4} style={columnStyle}>col-4</GridItem>
  <GridItem colSpan={4} style={columnStyle}>col-4</GridItem>
  <GridItem colSpan={2} style={columnStyle}>col-2</GridItem>
  <GridItem colSpan={2} style={columnStyle}>col-2</GridItem>
  <GridItem colSpan={2} style={columnStyle}>col-2</GridItem>
  <GridItem colSpan={2} style={columnStyle}>col-2</GridItem>
  <GridItem colSpan={2} style={columnStyle}>col-2</GridItem>
  <GridItem colSpan={2} style={columnStyle}>col-2</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
  <GridItem colSpan={1} style={columnStyle}>col-1</GridItem>
</GridContainer>
```

### Disabled State

Make buttons look inactive by adding the disabled boolean attribute to any <span style="color: crimson">&lt;GridContainer></span> component. 

```js { "props": { "style": { "padding": "10px 350px 20px", "backgroundColor": "rgb(240, 244, 255)"  } } }
<GridContainer disabled>I’m disabled!</GridContainer>
```
