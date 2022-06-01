Generate an image of egghead.io course review that can be shared on social media.

## Develop

- run `vercel dev`
- visit `http://localhost:3000/api/resource`

## Usage

```js
queryString.stringifyUrl({
    url: 'https://share-cards.vercel.app/api/resource',
    query: {
     title,
     image
    }
```

## Example

<img src="https://share-cards.vercel.app/api/resource?title=Foundations%20of%20Accessibility&image=https://res.cloudinary.com/testing-accessibility/image/upload/v1652688645/00-foundations-of-accessibility/01-setting-the-stage-for-testing-accessibility/illustration-setting-the-stage-for-testing-accessibility_2x_o36van.png" width="500" />
