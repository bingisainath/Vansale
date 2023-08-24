import {takeLatest, put, call, takeEvery,delay} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const login = async (action: any) => {
  try {
    return await auth()
      .signInWithEmailAndPassword(action.email, action.password)
      .then(response => ({response}))
      .catch(error => ({error}));
  } catch (e) {
    console.log(e);
  }
};

const getRoute = async () => {
  const data = await firestore().collection('Route').get();

  const inventory: any[] | PromiseLike<any[]> = [];

  await data.forEach((doc: {data: () => any}) => {
    inventory.push(doc.data());
  });

  const route = await inventory.filter((element: any) => {
    if (element.RouteClosed == false) return element.RouteId;
    else {
      console.log('else consdition');
    }
  });
  return route;
};

const NewTrip = async (id: any) => {
  const StartedTime = firestore.FieldValue.serverTimestamp();

  const data = await firestore()
    .collection('Trip')
    .doc(id)
    .collection('Trip')
    .get();

  const inventory: any[] | PromiseLike<any[]> = [];

  await data.forEach((doc: {data: () => any}) => {
    inventory.push(doc.data());
  });

  console.log(inventory);

  let totalcount: number = 0;
  let truecount: number = 0;

  const newroutedata = await inventory.filter(element => {
    totalcount = totalcount + 1;
    if (element.RouteClosed) {
      truecount = truecount + 1;
    }
  });

  if (truecount === totalcount) {
    const newTripId = (totalcount + 1).toString();
    const routeId = await getRoute();

    await firestore()
      .collection('Trip')
      .doc(id)
      .collection('Trip')
      .doc(newTripId)
      .set({
        EndDate: '',
        StartDate: StartedTime,
        RouteId: routeId[0].RouteId,
        TripId: newTripId,
        RouteClosed: false,
        InventoryCheckout: false,
        Unloaded: false,
      });

    const trip = await firestore()
      .collection('Trip')
      .doc(id)
      .collection('Trip')
      .doc(newTripId)
      .get();

    return trip;
  } else {
    const trip = await firestore()
      .collection('Trip')
      .doc(id)
      .collection('Trip')
      .doc(totalcount.toString())
      .get();

    return trip;
  }
};

function* signUp(action: any): any {
  try {
    const {response, error} = yield call(login, action);

    if (response) {
      yield put({type: 'GET_LOGIN_SUCCESS', payload: response});
      const trip = yield call(NewTrip, response.user.uid);
      yield put({type: 'ASSIGN_TRIP', payload: trip._data});
    } else if (error) {
      console.log('error: ' + error);
      yield put({type: 'GET_LOGIN_FAILED', payload: 'fail'});
    }
  } catch (e) {
    console.log('Error in signup : ' + e);
  }
}

const logout: any = async (): Promise<any> => {
  try {
    await auth().signOut();
    return 'success';
  } catch (e) {
    return 'error';
  }
};

function* signOut(): any {
  try {
    const data: any = yield call(logout);
    if (data == 'success') {
      yield put({type: 'LOGGINGOUT', payload: 'success'});
    } else {
      console.log('error');
    }
  } catch (e) {
    console.log(e);
  }
}

const getInventory: any = async (data: any) => {
  try {
    const collection = await firestore()
      .collection('InventorDetails')
      .doc(data.id)
      .collection('Inventory')
      .get();

    const inventory: any[] | PromiseLike<any[]> = [];

    await collection.forEach((doc: {data: () => any}) => {
      inventory.push(doc.data());
    });

    return inventory;
  } catch (e) {
    return e;
  }
};

function* Load(action: any): any {
  try {
    const data = yield call(getInventory, action);
    console.log('load in redux saga');
    yield put({type: 'LOAD_INVENTORY_DATA', payload: data});
  } catch (e) {
    console.log('Load error: ' + e);
  }
}

const getCustomer: any = async (data: any) => {
  try {
    const collection = await firestore()
      .collection('CustomerDetails')
      .doc(data.id)
      .collection('Customer')
      .get();

    const customerData: any[] | PromiseLike<any[]> = [];

    await collection.forEach((doc: {data: () => any}) => {
      customerData.push(doc.data());
    });
    return customerData;
  } catch (e) {
    return e;
  }
};

function* Contant(action: any): any {
  try {
    const data = yield call(getCustomer, action);
    yield put({type: 'LOAD_CUSTOMER_DATA', payload: data});
  } catch (e) {
    console.log('getContant ' + e);
  }
}

const setIn: any = async (data: any) => {
  try {
    console.log(data);
    //console.log('data is called' + data.id);
    const getInventory = firestore()
      .collection('InventorDetails')
      .doc(data.id)
      .collection('Inventory');

    await data.cases.forEach(async (element: any) => {
      await getInventory.doc(element.ProductID).update({
        Cases: element.Cases,
      });
    });

    await data.units.forEach(async (element: any) => {
      await getInventory.doc(element.ProductID).update({
        Units: element.Units,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

function* updateInv(action: any): any {
  try {
    const data = yield call(setIn, action);
    yield put({type: 'LOAD_INVENTORY_DATA', payload: data});
  } catch (e) {
    console.log(e);
  }
}

const getInvoice: any = async (data: any) => {

  const date = firestore.Timestamp.now().toDate().toString().slice(4, 15);
  console.log(date);
  try {
 
    const collection = await firestore()
      .collection('InvoiceDetails')
      .doc(data.id)
      .collection(`Invoice-${data.trip}`)
      .get();

    const customerData: any = [];
    await collection.forEach((doc: {data: () => any}) => {
      customerData.push(doc.data());
    });

    let customerProduct;

    await customerData.filter((element: any) => {
      if (element.CustomerID == data.customerId) {
        customerProduct = element;
      }
    });

    return customerProduct;
  } catch (e) {
    return e;
  }
};

function* getInvoice2(action: any): any {
  const data = yield call(getInvoice, action);
  yield put({type: 'SET_INVOICE_DATA', payload: data});
}

const getInvoicedetails: any = async (data: any) => {

  const date = firestore.Timestamp.now().toDate().toString().slice(4, 15);
  console.log(data.id);
  try {
    // console.log('refrence console in invioce');

    const collection = await firestore()
      .collection('InvoiceDetails')
      .doc(data.id)
      .collection(`Invoice-${data.trip}`)
      .get();
    const customerData: any = [];
    collection.forEach((doc: {data: () => any}) => {
      customerData.push(doc.data());
    });

    return customerData;
  } catch (e) {
    return e;
  }
};

function* getInvoiceInfo(action: any): any {
  const data = yield call(getInvoicedetails, action);
  console.log('invoice in redux saga');
  yield put({type: 'SET_INFO_DATA', payload: data});
}

const setInvoice = async (data: any) => {

  const startDate = firestore.Timestamp.now().toDate().toString();
  const date = startDate.toString().slice(4, 15);
  const date2 = startDate.toString().slice(4, 25);
  const createdAt = new Date().toLocaleString();

  try {
    
     let finalProducts: any = [];

    const tempData = data.products.data;

    // for(let i=0;i<tempData.length;i++){
    //   if (tempData[i].Cases != 0 || tempData[i].Units != 0) {
    //     const temp = tempData[i];
    //     const unitVal = tempData[i].Units % tempData[i].UnitsPerCase;
    //     const caseVal = tempData[i].Units / tempData[i].UnitsPerCase;
    //     temp.Units = unitVal;
    //     temp.Cases = parseInt(temp.Cases) + Math.floor(caseVal);
    //     finalProducts.push(temp);
    //   } else {
    //     console.log(tempData[i]);
    //   }
    // }

    await tempData.forEach((element: any) => {
      if (element.Cases != 0 || element.Units != 0) {
        const temp = element;
        const unitVal = element.Units % element.UnitsPerCase;
        const caseVal = element.Units / element.UnitsPerCase;
        temp.Units = unitVal;
        temp.Cases = parseInt(temp.Cases) + Math.floor(caseVal);
        finalProducts.push(temp);
      } else {
        console.log(element);
      }
    });

  
    await firestore()
      .doc(`InvoiceDetails/${data.id}/Invoice-${data.Trip.TripId}/${data.customerId}`)
      .update({
        Information: '',
        EndDate: createdAt,
        products: finalProducts,
        TripId: data.Trip.TripId,
        BillNo: data.BillNo,
        TotalCost: data.TotalCost,
      });

    const Inv = await firestore()
      .collection('InventorDetails')
      .doc(data.id)
      .collection('Inventory')
      .get();

    const inventory: any[] | PromiseLike<any[]> = [];

    await Inv.forEach((doc: {data: () => any}) => {
      inventory.push(doc.data());
    });

    const getInventory = await firestore()
      .collection('InventorDetails')
      .doc(data.id)
      .collection('Inventory');

    await data.products1.data.forEach((element: any) => {
      inventory.forEach(async (data: any) => {
        if (element.ProductID == data.ProductID) {
          await getInventory.doc(data.ProductID).update({
            Cases: data.Cases - element.Cases,
          });
        }
      });
    });

    await data.products1.data.forEach((element: any) => {
      inventory.forEach(async (data: any) => {
        if (element.ProductID == data.ProductID) {
          await getInventory.doc(data.ProductID).update({
            Units: data.Units - element.Units,
          });
        }
      });
    });

  } catch (e) {
    console.log(e);
  }
  // return sendData
};
function* setInvoice2(action: any): any {
  console.log(action);
  try {
    const data = yield call(setInvoice, action);
  } catch (e) {
    console.log(e);
  }
}

const setStartTime = async (data: any) => {
  const startDate = firestore.Timestamp.now().toDate().toString();
  const date1 = startDate.toString().slice(4, 15);
  const date2 = startDate.toString().slice(4, 25);
  const createdAt = new Date().toLocaleString();

  await firestore()
    .doc(`InvoiceDetails/${data.id}/Invoice-${data.trip}/${data.customerId}`)
    .set({
      startDate: createdAt,
      Information: '',
      EndDate: '',
      products: [],
      CustomerID: data.customerId,
      TotalCost: 0,
    });
};

function* sagaSetStartTime(action: any): any {
  const data = yield call(setStartTime, action);
}

const setDenomation = async (data: any) => {
  console.log('denomation called');

  const EndTime = firestore.FieldValue.serverTimestamp();

  try {
    await firestore()
      .collection('Trip')
      .doc(data.id)
      .collection('Trip')
      .doc(data.Trip.TripId)
      .update({
        DenomationEntry: data.data,
        EndDate: EndTime,
        RouteClosed: true,
      });

    await firestore()
      .collection('Route')
      .doc(data.Trip.RouteId.toString())
      .update({
        RouteClosed: true,
      });
  } catch (e) {
    console.log(e);
  }
};

function* setDen(action: any): any {
  console.log(action);
  try {
    yield call(setDenomation, action);
  } catch (e) {
    console.log(e);
  }
}

const setProductszerofun: any = async (data: any) => {
  try {
    const collection = await firestore()
      .collection('InventorDetails')
      .doc(data.id)
      .collection('Inventory')
      .get();

    const inventory: any[] | PromiseLike<any[]> = [];

    collection.forEach((doc: {data: () => any}) => {
      inventory.push(doc.data());
    });

    let Inv: any = [];

    inventory.forEach((element: any) => {
      const data = element;
      data.Cases = 0;
      data.Units = 0;
      Inv.push(data);
    });

    return Inv;
  } catch (e) {
    return e;
  }
};

function* setProductszero(action: any): any {
  try {
    const data = yield call(setProductszerofun, action);
    console.log('load in redux saga');
    //console.log(data._data);
    yield put({type: 'LOAD_PRODUCTS', payload: data});
  } catch (e) {
    console.log(e);
  }
}

const setVisit = async (data: any) => {
  try {
    const collection = await firestore()
      .collection('Route')
      .doc(data.Trip.RouteId.toString())
      .get();

      //@ts-ignore
    const RouteData = collection._data.Customer;

    const filterData: any = [];

    RouteData.forEach((element: any) => {
      if (element.Id == data.customerId) {
        const data = element;
        data.Visited = true;
        filterData.push(data);
      } else {
        filterData.push(element);
      }
    });

    await firestore()
      .collection('Route')
      .doc(data.Trip.RouteId.toString())
      .update({
        Customer: filterData,
      });
  } catch (e) {
    console.log('Error : ' + e);
  }
};

function* setVisited(action: any): any {
  try {
    const data = yield call(setVisit, action);
  } catch (e) {
    console.log(e);
  }
}

const getTripCusFun = async (data: any) => {

  const RouteId = data.Trip.RouteId.toString();

  const RouteData = await firestore().collection('Route').doc(RouteId).get();

  //@ts-ignore
  return RouteData._data;
};

function* getTripCustomer(action: any): any {
  try {
    const data = yield call(getTripCusFun, action);

    yield put({type: 'TRIP_CUSTOMER_LOAD', payload: data});
  } catch (e) {
    console.log('Error in getTripCusFun: ' + e);
  }
}

const getCustInfo = async (data: any) => {

  const cusData = await firestore()
    .collection('CustomerDetails')
    .doc(data.id)
    .collection('Customer')
    .doc(data.customerId)
    .get();

  //@ts-ignore
  return cusData._data;
};

function* getCustomerDetail(action: any): any {
  try {
    const data = yield call(getCustInfo, action);
    yield put({type: 'SET_CUSTOMER_DETAIL', payload: data});
  } catch (e) {
    console.log(e);
  }
}

const getInvoicedatafun = async (data: any) => {

  const startDate = firestore.Timestamp.now().toDate().toString();
  const date1 = startDate.toString().slice(4, 15);

  const collection = await firestore()
    .collection(`InvoiceDetails/${data.id}/Invoice-${data.trip}`)
    .get();

  const invoiceData: any[] | PromiseLike<any[]> = [];

  collection.forEach((doc: {data: () => any}) => {
    invoiceData.push(doc.data());
  });

  let totalCash = 0;
  invoiceData.forEach((element: any) => {
    totalCash = totalCash + element.TotalCost;
  });

  return totalCash;
};

function* getInvoiceData(action: any): any {
  try {
    const data = yield call(getInvoicedatafun, action);
    yield put({type: 'GET_TOTAL_CASH', payload: data});
  } catch (e) {
    console.log(e);
  }
}

const setInvFun = async (data: any) => {

  const trip = await firestore()
    .collection('Trip')
    .doc(data.id)
    .collection('Trip')
    .doc(data.Trip.TripId)
    .update({
      InventoryCheckout: true,
    });

};

function* setInventoryCheckout(action: any): any {
  try {
    const data = yield call(setInvFun, action);
    //yield put({type: 'GET_TOTAL_CASH', payload: data});
  } catch (e) {
    console.log(e);
  }
}

const getTripFun = async (data:any) => {
  const trip = await firestore()
    .collection('Trip')
    .doc(data.id)
    .collection('Trip')
    .doc(data.Trip.TripId)
    .get();
  //@ts-ignore
  return trip._data

}

function* getTrip(action: any): any {
  try {
    const data = yield call(getTripFun, action);
    yield put({type: 'LOAD_TRIP', payload: data});
  } catch (e) {
    console.log(e);
  }
}

const setUnloadFun = async (data:any) => {
  const trip = await firestore()
    .collection('Trip')
    .doc(data.id)
    .collection('Trip')
    .doc(data.Trip.TripId)
    .update({
      Unloaded: true,
    });
}

function* setUnLoad(action: any): any {
  try {
    const data = yield call(setUnloadFun, action);
  } catch (e) {
    console.log(e);
  }
}

const setGoogleMap = async (data:any) => {


  let customerData :any = [];

  try{
    let radMetter = 2000; // Search withing 2 KM radius
    const url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      // this.state.searchedLocation.lat + 
      data.lat+
      ',' +
      // this.state.searchedLocation.lng + 
      data.lng+
      '&radius=' +
      radMetter +
      '&type=shop' +
      '&key=AIzaSyBT4eIW5KQoalNqar5cfPpAfnvpcpwLBGM';

      await fetch(url)
      .then(res => {
        return res.json();
      })
      .then(async res => {
        var places = []; // This Array WIll contain locations received from google
        for (let googlePlace of res.results) {
          var place = {};
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          };

          var gallery = [];

          place['placeTypes'] = googlePlace.types;
          place['coordinate'] = coordinate;
          place['placeId'] = googlePlace.place_id;
          place['placeName'] = googlePlace.name;
          place['gallery'] = gallery;

          places.push(place);
        }

        var places = []; // This Array WIll contain locations received from google
        for (let googlePlace of res.results) {
          var place = {};
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          };
    
          var gallery = [];
    
          place['placeTypes'] = googlePlace.types;
          place['coordinate'] = coordinate;
          place['placeId'] = googlePlace.place_id;
          place['placeName'] = googlePlace.name;
          place['gallery'] = gallery;
    
          places.push(place);
        }

        places.forEach((element:any) => {
          customerData.push(element);
        });
      })

  }catch(e){
    console.log(e);
  }
  return customerData;
}

function* setGoogleMapApi(action: any):any {
   try {
    const data = yield call(setGoogleMap, action);
    yield put({type: 'SET_GOOGLE_MAP_APICALL', payload: data});
  } catch (e) {
    console.log(e);
  }
}


export default function* rootSaga() {
  yield takeEvery('GET_USERS_REQUEST', signUp);
  yield takeEvery('GET_USERS_LOGOUT', signOut);
  yield takeEvery('LOAD_INVENTORY', Load);
  yield takeEvery('LOAD_CUSTOMER', Contant);
  yield takeEvery('UPDATE_INVENTORY', updateInv);
  yield takeEvery('LOAD_INFORMATION', getInvoiceInfo);
  yield takeEvery('SET_DENOMATION_ENTRY', setDen);
  yield takeEvery('SET_START_TIME', sagaSetStartTime);
  yield takeEvery('UPDATE_INVOICE', setInvoice2);
  yield takeEvery('LOAD_INFO', getInvoiceInfo);
  yield takeEvery('LOAD_INVOICE', getInvoice2);
  yield takeEvery('SET_PRODUCTS', setProductszero);
  yield takeEvery('SET_VISITED', setVisited);
  yield takeEvery('TRIP_CUSTOMER', getTripCustomer);
  yield takeEvery('GET_CUSTOMER_DETAIL', getCustomerDetail);
  yield takeEvery('SET_TOTAL_CASH', getInvoiceData);
  yield takeEvery('SET_INVENTORY_CHECKEDOUT', setInventoryCheckout);
  yield takeEvery('SET_LOAD_TRIP', getTrip);
  yield takeEvery('SET_UNLOAD', setUnLoad);
  yield takeEvery('GET_GOOGLE_MAP_APICALL', setGoogleMapApi);
}
