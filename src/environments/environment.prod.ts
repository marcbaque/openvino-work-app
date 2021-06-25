function getProvider(providers: string[]) {
  let index = Math.floor(Math.random() * providers.length)

  return providers[index];
}

export const environment = {
  production: true,
  providerUrl: getProvider([
    'https://rinkeby.infura.io/v3/80311d26ccb74946b9d016f38ce901d2',
    'https://rinkeby.infura.io/v3/781c281ea82347709935f5b394f2383c',
    'https://rinkeby.infura.io/v3/6d7880a8f4b347ca8953d2715e164241',
  ]),
  apiUrl: 'https://costaflores.openvino.exchange',
  apiKey: "f7i3g2J5OE7VgMFKfMWN8XKLxSTH3w-JjanKuZSrQBRdgvnpJIJuroB9njrYMRKD"
};