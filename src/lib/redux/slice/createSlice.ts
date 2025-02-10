import {CreateSliceOptions, Slice, SliceCaseReducers} from "@reduxjs/toolkit";

export declare function createSlice
<State, CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string>
(options: CreateSliceOptions<State, CaseReducers, Name>)
  : Slice<State, CaseReducers, Name>;