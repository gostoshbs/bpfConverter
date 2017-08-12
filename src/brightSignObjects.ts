import PlatformService from './platform';

import {
  BsDeviceInfo,
  BSNetworkInterfaceConfig,
  BsRegistry,
} from './brightSignInterfaces';


export function getBrightSignObjects() : Promise<any> {

  let bsObjects : any = {};
  
  return new Promise( (resolve, reject) => {

    bsObjects.deviceInfo = PlatformService.default.getDeviceInfo();
    bsObjects.registry = PlatformService.default.getRegistry();
    bsObjects.systemTime = PlatformService.default.getSystemTime();

    let promises : Promise<any>[] = [];

    let getEth0Promise : Promise<BSNetworkInterfaceConfig> = getNetworkConfiguration('eth0');
    let getEth1Promise : Promise<BSNetworkInterfaceConfig> = getNetworkConfiguration('eth1');
    let getEdidPromise : Promise<any> = getEdid();
    let getBrightSignControlPortPromise : Promise<any> = PlatformService.default.getControlPort('BrightSign');
    let getExpanderControlPortPromise : Promise<any> = PlatformService.default.getControlPort('Expander-0-GPIO');
    let getLightController0ControlPortPromise : Promise<any> =
      PlatformService.default.getControlPort('LightController-0-CONTROL');
    let getLightController1ControlPortPromise : Promise<any> =
      PlatformService.default.getControlPort('LightController-1-CONTROL');
    let getLightController2ControlPortPromise : Promise<any> =
      PlatformService.default.getControlPort('LightController-2-CONTROL');
    let getLightController0DiagnosticsPortPromise : Promise<any> =
      PlatformService.default.getControlPort('LightController-0-DIAGNOSTICS');
    let getLightController1DiagnosticsPortPromise : Promise<any> =
      PlatformService.default.getControlPort('LightController-1-DIAGNOSTICS');
    let getLightController2DiagnosticsPortPromise : Promise<any> =
      PlatformService.default.getControlPort('LightController-2-DIAGNOSTICS');

    // roStorageInfo

    // roStorageHotplug

    // roNetworkHotplug

    // roDiskMonitor

    // roHttpServer??
    // https://blog.risingstack.com/your-first-node-js-http-server/

    // roNetworkAdvertisement

    // roAssetPool - maybe not here
    // roAssetPoolFiles - maybe not here

    promises.push(getEth0Promise);
    promises.push(getEth1Promise);
    promises.push(getEdidPromise);
    promises.push(getBrightSignControlPortPromise);
    promises.push(getExpanderControlPortPromise);
    promises.push(getLightController0ControlPortPromise);
    promises.push(getLightController1ControlPortPromise);
    promises.push(getLightController2ControlPortPromise);
    promises.push(getLightController0DiagnosticsPortPromise);
    promises.push(getLightController1DiagnosticsPortPromise);
    promises.push(getLightController2DiagnosticsPortPromise);

    Promise.all(promises).then( (results : any[]) => {

      bsObjects.eth0Configuration = results[0];
      bsObjects.eth1Configuration = results[1];
      bsObjects.edid = results[2];
      bsObjects.svcPort = results[3];
      bsObjects.expanderControlPort = results[4];
      bsObjects.lightController0ControlPort = results[5];
      bsObjects.lightController1ControlPort = results[6];
      bsObjects.lightController2ControlPort = results[7];
      bsObjects.lightController0DiagnosticsPort = results[8];
      bsObjects.lightController1DiagnosticsPort = results[9];
      bsObjects.lightController2DiagnosticsPort = results[10];

      const deviceHasGpioConnector : boolean = PlatformService.default.deviceHasGpioConnector(bsObjects.deviceInfo);
      if (deviceHasGpioConnector) {
        bsObjects.controlPort = bsObjects.svcPort;
      }
      else {
        bsObjects.controlPort = bsObjects.expanderControlPort;
      }

      resolve(bsObjects);
    })
      .catch(() => {
        reject();
      });
  });
}

function getNetworkConfiguration(networkInterface : string) : Promise<BSNetworkInterfaceConfig> {
  return new Promise( (resolve) => {
    PlatformService.default.getNetworkConfiguration(networkInterface)
      .then( (networkConfiguration : BSNetworkInterfaceConfig) => {
        resolve(networkConfiguration);
      })
      .catch((err : any) => {
        resolve(null);
      });
  })
}

function getEdid() : Promise<any> {
  return new Promise( (resolve) => {
    PlatformService.default.getEdid().then( (edid : any) => {
      resolve(edid);
    })
      .catch( (err : any) => {
        resolve(null);
      })
  });
}

