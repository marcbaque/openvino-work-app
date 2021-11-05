function getProvider(providers: string[]) {
  let index = Math.floor(Math.random() * providers.length);

  return providers[index];
}

export const environment = {
  production: false,
  providerUrl: getProvider([
    "https://rinkeby.infura.io/v3/cef28f8cc48644cdb133281c30a6d1d6",
  ]),
  apiUrl: "https://costaflores.openvino.exchange",
  apiKey: "eNqeAW5l1TifPMdmo7B5UIyRhjdmJwmTeakcHZr0SiZ5Z6ByJElQ1S3fuEqaMiZZ",
};
