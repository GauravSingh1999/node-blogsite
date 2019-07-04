const publicVapidKey = 'BGPSyR5LnDepb4Qe3OioEPXIwElsvaE0Xf53lFfBKvh14YR3diCdoDINnyQyGemV1ijq_yVXBQFbeq04agznoXg'

if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err))
}

async function send () {
  console.log('Registering Service Worker..')
  const register = await navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  })
  console.log('Service Worker resgistered!')

  console.log('Registering PUSHHHHH')
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  const newBody = {
    subscription: subscription,
    id: '5d1864ac0b9a7f41c41184b8' // thw user client wants to subscribe XD XD
  }
  const sub = JSON.stringify(newBody)
  console.log('Push Registered')
  var data = await fetch('/user/subscribe?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMWE2MzgxZjJhODg0NTE3Nzc5NGJhNyIsImVtYWlsIjoiaGlAZ21haWwuY29tIn0sImlhdCI6MTU2MjAxMjU1M30.TLDSh4YzMkY6e7Etncc_8pocHq4Ry_sy9UcoTxIMEf8', {
    method: 'POST',
    body: sub,
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log(data)
  console.log('JOB DONE')
}

function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
