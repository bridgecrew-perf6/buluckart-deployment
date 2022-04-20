import express from 'express';
import { authRouter } from './resources/auth';
import { customerRouterOtp } from './resources/customerotp';
import { productRouter } from './resources/product';
import { vendorRouter } from './resources/vendor';
import { categoryRouter } from './resources/category';
import { locationRouter } from './resources/location';
import { orderRouter } from './resources/order';
import { orderFileImportExportRoute } from'./resources/order'
import { paymentRouter } from './resources/payment';
import { inventoryRouter } from './resources/Upload Inventory Image';
import { CouponRouter } from './resources/Marketing&Permotion/coupon';
import { alertRouter } from'./resources/Marketing&Permotion/alertMessage';
import { referRouter } from'./resources/Marketing&Permotion/refer&earn';
import { lcouponRoute} from './resources/LoyalityCoupon/loyantiCoupon';
import { congigueLoyaltyRoute } from './resources/LoyalityCoupon/configurePoints';
import { enquiryRoute } from './resources/EnquiryApi';
import { informationRouter } from './resources/Settings/storeInformations';
import { faqRouter } from './resources/Settings/FAQ';
import { pageRouter } from './resources/Settings/pages';
import { bannerRouter } from './resources/Settings/banner';
import { deliveryRouter } from './resources/Settings/deliveryAreas';
import { pickupRouter } from './resources/Settings/deliveryAreas/pickupAreas';
import { cityRouter } from'./resources/Settings/deliveryAreas/cityManage';
import { textRoute} from'./resources/Settings/DeliverySlotSetting/textSlot';
import { deliverySlotRouter }  from'./resources/Settings/DeliverySlotSetting/deliverySlot';
import { paymentSettingRoute} from './resources/Settings/onlinPaymentSetting';
import { featureRouter } from'./resources/Settings/featuresSetting';
import { imgRouter } from './resources/singleimage';
import { excelUploadRouter }from'./resources/bulkImportExport';
import {runnerRouterOtp} from"./resources/RunnerAuth";
import {mapAdressRouter} from"./resources/mapCustomerAdress";
import {excelUploadCustomerRouter } from "./resources/customerotp";
import {custCartRouter} from"./resources/customerAddToCart";
import {custFavListRouter} from"./resources/customerAddToFavList";
import {TaxSettingRouter} from"./resources/Settings/TaxSetting"




export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/authotp', customerRouterOtp);
restRouter.use('/location', locationRouter);
restRouter.use('/product', productRouter);
restRouter.use('/vendor', vendorRouter);
restRouter.use('/category', categoryRouter);
restRouter.use('/order', orderRouter);
restRouter.use('/payment', paymentRouter);

//all  seting and management  route
restRouter.use('/inventory',inventoryRouter)
restRouter.use('/coupon',CouponRouter)
restRouter.use('/alert',alertRouter)
restRouter.use('/refer',referRouter)
restRouter.use('/configue',congigueLoyaltyRoute)
restRouter.use('/loylitycoupon',lcouponRoute)
restRouter.use('/enquiry',enquiryRoute)
restRouter.use('/settinginf',informationRouter)
restRouter.use('/faq',faqRouter)
restRouter.use('/page',pageRouter)
restRouter.use('/banner',bannerRouter)
restRouter.use('/delivery',deliveryRouter)
restRouter.use('/pickup',pickupRouter)
restRouter.use('/city',cityRouter)
restRouter.use('/textslot',textRoute)
restRouter.use('/deliveryslot',deliverySlotRouter)

restRouter.use('/paymentsettings',paymentSettingRoute)
restRouter.use('/features',featureRouter)
restRouter.use('/img',imgRouter)
restRouter.use('/excel',excelUploadRouter)
restRouter.use('/runnerauth',runnerRouterOtp)
restRouter.use('/mapadress',mapAdressRouter)
restRouter.use('/customerfile',excelUploadCustomerRouter)
restRouter.use('/orderfile',orderFileImportExportRoute)
restRouter.use('/custCart',custCartRouter)
restRouter.use('/favlist',custFavListRouter)
restRouter.use('/settingtax',TaxSettingRouter)







