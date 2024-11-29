## Micard SSO SDK

### Script Tag Usage

```html
<script src="https://cdn.micard.healthcare/sdk/micard-sso.min.js"></script>
<script>
  const sso = new MicardSSO('your-client-id');
  
  async function signIn() {
    try {
      const result = await sso.signIn({
        scope: ['basic_profile', 'medical_data']
      });
      
      // Handle successful sign-in
      console.log(result.token);
      console.log(result.userData);
    } catch (error) {
      // Handle error
    }
  }
</script>
```

### React Package Usage

```jsx
import { MicardButton } from '@micard/sso';

function App() {
  const handleSuccess = (response) => {
    console.log(response.token);
    console.log(response.userData);
  };

  return (
    <MicardButton
      clientId="your-client-id"
      scope={['basic_profile']}
      onSuccess={handleSuccess}
    />
  );
}
```