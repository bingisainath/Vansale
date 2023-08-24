let user = {
  data: '',
  isLogin: false,
  loginSuccess: '',
  loginFail: '',
  Inventory: '',
  InventoryCheckedOut: true,
  Customer: '',
  CustomerProducts: '',
  Information: '',
  Invoice: '',
  Products: '',
  Trip: '',
  TripCustomer: '',
  CustomerDetail: '',
  Totalcash: '',
  allCustomer: '',
  loadingData: true,
  nearByCustomers: '',
};

const users = (state = user, action: any) => {
  console.log(action.type);

  switch (action.type) {
    case 'GET_USERS_REQUEST':
      return {state, data: action.payload};
    case 'GET_LOGIN_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loginSuccess: 'success',
        // isLogin: !state.isLogin,
        loginFail: '',
        InventoryCheckedOut: true,
      };
    case 'ASSIGN_TRIP':
      return {
        ...state,
        Trip: action.payload,
        isLogin: !state.isLogin,
      };
    case 'SET_LOAD_TRIP':
      return {
        ...state,
      };
    case 'LOAD_TRIP':
      return {
        ...state,
        Trip: action.payload,
      };
    case 'SET_UNLOAD':
      return {
        ...state,
      };
    case 'GET_LOGIN_FAILED':
      return {
        ...state,
        loginSuccess: '',
        loginFail: 'fail',
      };
    case 'LOGGINGOUT':
      return {
        ...state,
        loginSuccess: '',
        loginFail: '',
        isLogin: !state.isLogin,
        Inventory: '',
        Customer: '',
        data: '',
        CustomerProducts: '',
        Information: '',
        Trip: '',
        InventoryCheckedOut: true,
        loadingData: true,
        //Invoice: '',
      };
    case 'LOAD_INVENTORY':
      return {
        ...state,
        Inventory: action.payload,
      };
    case 'LOAD_INVENTORY_DATA':
      return {
        ...state,
        Inventory: action.payload,
      };
    case 'SET_INVENTORY_CHECKEDOUT':
      return {
        ...state,
        //InventoryCheckedOut: false,
      };
    case 'GET_INVENTORY_CHECKEDOUT':
      return {
        ...state,
        InventoryCheckedOut: false,
      };
    case 'LOAD_CUSTOMER':
      return {
        ...state,
        Customer: action.payload,
      };
    case 'LOAD_CUSTOMER_DATA':
      return {
        ...state,
        Customer: action.payload,
      };
    case 'UPDATE_INVENTORY':
      return {
        ...state,
        Inventory: action.payload,
      };
    case 'LOAD_INFORMATION':
      return {
        ...state,
        Information: action.payload,
      };
    case 'SET_DENOMATION_ENTRY':
      return state;
    case 'SET_START_TIME':
      return state;
    case 'UPDATE_INVOICE':
      return {
        ...state,
        Invoice: action.payload,
      };
    case 'LOAD_INFO':
      return {
        ...state,
        Information: action.payload,
      };
    case 'SET_INFO_DATA':
      return {
        ...state,
        Information: action.payload,
      };
    case 'SET_INVOICE_DATA':
      return {
        ...state,
        Invoice: action.payload,
      };
    case 'LOAD_INVOICE':
      return {
        ...state,
        Invoice: action.payload,
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
      };
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        Products: action.payload,
      };
    case 'SET_VISITED':
      return {
        ...state,
      };
    case 'TRIP_CUSTOMER':
      return {
        ...state,
        TripCustomer: action.payload,
      };
    case 'TRIP_CUSTOMER_LOAD':
      return {
        ...state,
        TripCustomer: action.payload,
      };
    case 'GET_CUSTOMER_DETAIL':
      return {
        ...state,
        CustomerDetail: action.payload,
      };
    case 'SET_CUSTOMER_DETAIL':
      return {
        ...state,
        CustomerDetail: action.payload,
      };
    case 'GET_ALL_CUSTOMER':
      return {
        ...state,
        allCustomer: action.payload,
      };
    case 'SET_TOTAL_CASH':
      return {
        ...state,
      };
    case 'GET_TOTAL_CASH':
      return {
        ...state,
        Totalcash: action.payload,
      };
    case 'SET_GOOGLE_MAP_APICALL':
      return {
        ...state,
        nearByCustomers: action.payload,
      };
    case 'GET_GOOGLE_MAP_APICALL':
      return {
        ...state,
        nearByCustomers: action.payload,
      };
    case 'LOADING':
      return {
        ...state,
        loadingData: false,
      };

    default:
      return state;
  }
};

export default users;
